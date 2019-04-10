import React, { Component } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import Recaptcha from "react-google-invisible-recaptcha";

import Head from "../components/head";
import Nav from "../components/nav";

import SignInForm from "../components/forms/signInForm";

import "../styles/main.scss";

class SignIn extends Component {
  state = {
    signInForm: { state: "INITIATE", error: "" },
    formData: {}
  };

  onRecaptchaResolve = () => {
    const recaptchaToken = this.recaptchaRef.getResponse();

    const { formData } = this.state;
    this.setState({
      signInForm: { state: "SUBMITTING" }
    });

    fetch("/api/panel/authenticate/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        password: formData.password,
        rememberMe: formData.rememberMe,
        username: formData.email,
        recaptchaToken
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({
            signInForm: {
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
      .then(json => {
        if (json.status === 400) {
          this.setState({
            signInForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          this.recaptchaRef.reset();
          return;
        }
        if (formData.rememberMe) {
          localStorage.setItem("token", json.id_token);
        } else {
          sessionStorage.setItem("token", json.id_token);
        }

        this.props.router.push("/");
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

  onSignInSubmit = formData => {
    this.setState(
      {
        signUpForm: { state: "SUBMITTING" },
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
        <Head title="Sign In" />
        <Nav />

        <div className="page signIn">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Sign In</h1>

                {this.state.signInForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.signInForm.error}</p>
                  </div>
                )}

                <SignInForm
                  onProgress={this.state.signInForm.state === "SUBMITTING"}
                  onSubmit={formData => this.onSignInSubmit(formData)}
                />

                <Recaptcha
                  ref={ref => (this.recaptchaRef = ref)}
                  sitekey={process.env.RECAPTCHA_KEY}
                  onResolved={() => this.onRecaptchaResolve()}
                  onError={() => this.onRecaptchaError("ERROR")}
                  onExpired={() => this.onRecaptchaError("EXPIRED")}
                />
                <br />
                <br />
                <p className="note has-text-centered">
                  Do not have an account?{" "}
                  <Link href="/signUp">
                    <a>Sign up</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
