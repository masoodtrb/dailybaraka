import React, { Component } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import Link from "next/link";

import Head from "../components/head";
import Nav from "../components/nav";
import SignUpForm from "../components/forms/signUpForm";

import "../styles/main.scss";

class SignUp extends Component {
  state = {
    signUpForm: { state: "INITIATE", error: "" },
    formData: {},
    enteredEmail: ""
  };

  onRecaptchaResolve = () => {
    const recaptchaToken = this.recaptchaRef.getResponse();

    const { formData } = this.state;
    fetch("/api/shop/account/v1/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        langKey: "en",
        email: formData.email,
        login: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        recaptchaToken
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            signUpForm: {
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
        if (json.status === 400) {
          this.setState({
            signUpForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          this.recaptchaRef.reset();
          return;
        }

        this.setState({
          signUpForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  onRecaptchaError = errorType => {
    this.setState({
      signUpForm: {
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

  onSignUpSubmit = formData => {
    this.setState(
      {
        signUpForm: { state: "SUBMITTING" },
        enteredEmail: formData.email,
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
        <Head title="Sign up" />
        <Nav />

        <div className="page signUp">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Sign Up</h1>

                {this.state.signUpForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.signUpForm.error}</p>
                  </div>
                )}

                {this.state.signUpForm.state === "SUCCESS" && (
                  <div className="notification is-success">
                    <strong>
                      Your information has been successfully submitted.
                    </strong>
                    <br />
                    <p>
                      To continue and activate your account, we are sending an
                      email to "{this.state.enteredEmail}" for confirmation your
                      mail address.
                    </p>
                    <p>
                      If you couldn't find the mail in the Inbox folder, check
                      your Spam/Junk folder please.
                    </p>
                  </div>
                )}

                {this.state.signUpForm.state !== "SUCCESS" && (
                  <React.Fragment>
                    <SignUpForm
                      onProgress={this.state.signUpForm.state === "SUBMITTING"}
                      onSubmit={formData => this.onSignUpSubmit(formData)}
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

export default SignUp;
