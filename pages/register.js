import React, { Component } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import Link from "next/link";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  defineMessages
} from "react-intl";

import Head from "../components/head";
import Nav from "../components/nav";
import SignUpForm from "../components/forms/registerForm";

import "../styles/main.scss";
import withIntl from "../hoc/withIntl";

const messages = defineMessages({
  title: {
    id: "register.title",
    defaultMessage: "Sign Up"
  },
  registerError: {
    id: "register.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  }
});
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
              error: this.props.intl.formatMessage(messages.registerError, {
                status: response.status,
                statusText: response.statusText
              })
            }
          });
          this.recaptchaRef.reset();
        }
      })
      .then(text => (text.length ? JSON.parse(text) : {}))
      .then(json => {
        if (json.status >= 300) {
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
          <FormattedHTMLMessage
            id="common.recaptcha.error"
            values={{
              reportLink: (
                <Link
                  href="/page?slug=contact-us"
                  as={`/${this.props.locale}/page/contact-us`}
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
            defaultMessage={
              <React.Fragment>
                The authorizing system, to detect you as a{" "}
                <strong>HUMAN</strong> not a 🤖, occurred an error.
                <br />
                You could reload page to continue. If you receive this error
                again, please '{reportLink}'.
              </React.Fragment>
            }
          />
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
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav />

        <div className="page signUp">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>
                  <FormattedMessage
                    id="register.title"
                    defaultMessage="Sign Up"
                  />
                </h1>

                {this.state.signUpForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>
                      <FormattedMessage
                        id="common.error"
                        defaultMessage="An error has occurred"
                      />
                    </strong>
                    <br />
                    <p>{this.state.signUpForm.error}</p>
                  </div>
                )}

                {this.state.signUpForm.state === "SUCCESS" && (
                  <div className="notification is-success">
                    <FormattedHTMLMessage
                      id="register.success"
                      defaultMessage={
                        <React.Fragment>
                          <strong>
                            Your information has been successfully submitted.
                          </strong>
                          <br />
                          <p>
                            To continue and activate your account, we are
                            sending an email to "{this.state.enteredEmail}" for
                            confirmation your mail address.
                          </p>
                          <p>
                            If you couldn't find this mail in your Inbox folder,
                            check the Spam/Junk folder please.
                          </p>
                        </React.Fragment>
                      }
                    />
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

export default withIntl(SignUp);
