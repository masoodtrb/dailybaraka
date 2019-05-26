import React, { Component } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { withRouter } from "next/router";
import Link from "next/link";
import Recaptcha from "react-google-invisible-recaptcha";

import Head from "../components/head";
import Nav from "../components/nav";

import SignInForm from "../components/forms/loginForm";

import "../styles/main.scss";
import withIntl from "../hoc/withIntl";

const messages = defineMessages({
  title: {
    id: "login.title",
    defaultMessage: "Sign In"
  },
  loginError: {
    id: "login.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  }
});

class SignIn extends Component {
  static async getInitialProps({ query }) {
    return {
      returnUrl: query.returnUrl
    };
  }

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
              error: this.props.intl.formatMessage(messages.loginError, {
                status: response.status,
                statusText: response.statusText
              })
            }
          });
          this.recaptchaRef.reset();
        }
      })
      .then(json => {
        if (json.status >= 300) {
          this.setState({
            signInForm: {
              state: "ERROR",
              error: json.detail || json.title
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

        if (this.props.returnUrl) {
          this.props.router.push(this.props.returnUrl);
          return;
        }
        this.props.router.push(`/${this.props.intl.locale}`);
      });
  };

  onRecaptchaError = errorType => {
    this.setState({
      signInForm: {
        state: "ERROR",
        error: (
          <FormattedHTMLMessage
            id="common.recaptcha.error"
            values={{
              reportLink: (
                <Link
                  href={`/page?slug=contact-us&lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/page/contact-us`}
                >
                  <a>
                    <FormattedMessage
                      id="common.recaptcha.error.report-link"
                      defaultMessage="get in touch with us."
                    />
                  </a>
                </Link>
              )
            }}
            defaultMessage={`
              <div>
                The authorizing system, to detect you as a{" "}
                <strong>HUMAN</strong> not a 🤖, occurred an error.
                <br />
                You could reload page to continue. If you receive this error
                again, please '{reportLink}'.
              </div>
            `}
          />
        )
      }
    });
  };

  onSignInSubmit = formData => {
    this.setState(
      {
        signInForm: { state: "SUBMITTING" },
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
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav />

        <div className="page signIn">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>
                  <FormattedMessage id="login.title" defaultMessage="Sign In" />
                </h1>

                {this.state.signInForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>
                      <FormattedMessage
                        id="common.error"
                        defaultMessage="An error has occurred"
                      />
                    </strong>
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
                  <FormattedMessage
                    id="login.register-hint"
                    defaultMessage="Do not have an account?"
                  />
                  &nbsp;
                  <Link
                    href={`/register?lang=${this.props.intl.locale}`}
                    as={`/${this.props.intl.locale}/signUp`}
                  >
                    <a>
                      <FormattedMessage
                        id="common.register"
                        defaultMessage="Sign up"
                      />
                    </a>
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

export default withRouter(withIntl(SignIn));
