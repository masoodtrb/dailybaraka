import React, { Component } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import Recaptcha from "react-google-invisible-recaptcha";

import Head from "../components/head";
import Nav from "../components/nav";

import ForgotPasswordForm from "../components/forms/forgotPassword";

import "../styles/main.scss";

class ForgotPassword extends Component {
  state = {
    forgotPasswordForm: { state: "INITIATE", error: "" },
    formData: {}
  };

  onRecaptchaResolve = () => {
    const recaptchaToken = this.recaptchaRef.getResponse();

    const { formData } = this.state;
    this.setState({
      forgotPasswordForm: { state: "SUBMITTING" }
    });

    fetch("/api/shop/account/v1/reset-password/init", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        recaptchaToken
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            forgotPasswordForm: {
              state: "ERROR",
              error:
                "Can not process the request. Type of error: " +
                response.status +
                ", response status: " +
                response.statusText
            }
          });
          this.recaptchaRef.reset();
        }
      })
      .then(text => (text.length ? JSON.parse(text) : {}))
      .then(json => {
        if (json.status >= 300) {
          this.setState({
            forgotPasswordForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          this.recaptchaRef.reset();
          return;
        }

        this.setState({
          forgotPasswordForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  onRecaptchaError = errorType => {
    this.setState({
      forgotPasswordForm: {
        state: "ERROR",
        error: (
          <React.Fragment>
            The authorizing system, to detect you as a <strong>HUMAN</strong>{" "}
            not a 🤖, occurred an error.
            <br />
            You could reload page to continue. If you receive this error again,
            please{" "}
            <Link href="/page/contact-us">
              <a>get in touch with us.</a>
            </Link>
          </React.Fragment>
        )
      }
    });
  };

  onForgotPasswordSubmit = formData => {
    this.setState(
      {
        forgotPasswordForm: { state: "SUBMITTING" },
        formData
      },
      () => {
        this.recaptchaRef.execute();
      }
    );
  };

  render() {
    return (
      <div>
        <Head title="Forgot Password" />
        <Nav />

        <div className="page signIn">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Forgot Password</h1>

                {this.state.forgotPasswordForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.forgotPasswordForm.error}</p>
                  </div>
                )}

                {this.state.forgotPasswordForm.state === "SUCCESS" && (
                  <div className="notification is-success">
                    <strong>
                      Your reset password request has been successfully
                      submitted.
                    </strong>
                    <br />
                    <p>You will receive an email to reset your password.</p>
                    <p>
                      If you couldn't find this mail in your Inbox folder, check
                      the Spam/Junk folder please.
                    </p>
                  </div>
                )}

                {this.state.forgotPasswordForm.state !== "SUCCESS" && (
                  <React.Fragment>
                    <ForgotPasswordForm
                      onProgress={
                        this.state.forgotPasswordForm.state === "SUBMITTING"
                      }
                      onSubmit={formData =>
                        this.onForgotPasswordSubmit(formData)
                      }
                    />

                    <Recaptcha
                      ref={ref => (this.recaptchaRef = ref)}
                      sitekey={process.env.RECAPTCHA_KEY}
                      onResolved={() => this.onRecaptchaResolve()}
                      onError={() => this.onRecaptchaError("ERROR")}
                      onExpired={() => this.onRecaptchaError("EXPIRED")}
                    />
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
