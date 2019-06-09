import React, { Component } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import {
  defineMessages,
  FormattedHTMLMessage,
  FormattedMessage
} from "react-intl";

import * as pageService from "../services/page";

import Head from "../components/head";
import Nav from "../components/nav";

import ContactForm from "../components/forms/contactForm";
import SignUpForm from "../components/forms/registerForm";

import "../styles/main.scss";
import withIntl from "../hoc/withIntl";

const messages = defineMessages({
  forgotPasswordError: {
    id: "page.contact-us.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  }
});

class Page extends Component {
  static async getInitialProps({ query, res }) {
    const page = await pageService.getPageContent(query.lang, query.slug);

    if (!page || page.status >= 300) {
      res.statusCode = 404;
      throw new Error("Page not found");
    }

    return {
      page,
      slug: query.slug
    };
  }

  state = {
    contactForm: { state: "INITIATE", error: "" },
    contactFormData: {},
    signUpForm: { state: "INITIATE", error: "" },
    formData: {},
    enteredEmail: ""
  };

  onContactFormSubmit = formData => {
    this.setState(
      {
        contactForm: { state: "SUBMITTING" },
        contactFormData: formData
      },
      () => {
        this.recaptchaContactFormRef.execute();
      }
    );
  };

  onContactFormRecaptchaResolved = () => {
    const recaptchaToken = this.recaptchaContactFormRef.getResponse();

    const formData = this.state.contactFormData;

    var header = {
      "content-type": "application/json"
    };
    if (localStorage.token) {
      header.Authorization = `Bearar ${localStorage.token}`;
    }
    fetch("/api/shop/contact-us/v1/create", {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        address: formData.address,
        city: formData.city,
        country: formData.country,
        phoneNumbers: formData.phone,
        postalCode: formData.postalCode,
        province: formData.state,
        message: formData.message,
        email: formData.email,
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
            contactForm: {
              state: "ERROR",
              error: this.props.intl.formatMessage(
                messages.forgotPasswordError,
                {
                  status: response.status,
                  statusText: response.statusText
                }
              )
            }
          });
          this.recaptchaRef.reset();
        }
      })
      .then(text => (text.length ? JSON.parse(text) : {}))
      .then(json => {
        if (json.status >= 300) {
          this.setState({
            contactForm: {
              state: "ERROR",
              error: json.detail || json.title
            }
          });
          this.recaptchaContactFormRef.reset();

          return;
        }

        this.setState({
          contactForm: {
            state: "SUCCESS"
          }
        });
      });
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
        region: this.props.intl.locale.toUpperCase(),
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
              error: json.detail || json.title
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
            defaultMessage={`<div>
                The authorizing system, to detect you as a{" "}
                <strong>HUMAN</strong> not a 🤖, occurred an error.
                <br />
                You could reload page to continue. If you receive this error
                again, please '{reportLink}'.
              </div>`}
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
    const { page, slug } = this.props;

    return (
      <div>
        <Head title={page.title} />
        <Nav />

        <div className={["page rich-content", slug].join(" ")}>
          <div className="container">
            {page.slug === "welcome" ? (
              <div className="columns">
                <div className="column is-3 is-hidden-touch">
                  <img
                    className="welcome__image"
                    src="/static/images/mobile.png"
                    alt="Daily Baraka Mobile"
                  />
                </div>
                <div className="column is-5-desktop is-8-tablet is-12-mobile">
                  <h1>{page.title}</h1>

                  <div className="rich-content__content">
                    {page.body && (
                      <div dangerouslySetInnerHTML={{ __html: page.body }} />
                    )}
                  </div>
                </div>
                <div className="column is-4 is-12-mobile">
                  <div className="welcome__register">
                    {this.state.signUpForm.state === "ERROR" && (
                      <div className="notification is-danger">
                        <button
                          className="delete"
                          onClick={() =>
                            this.setState({
                              signUpForm: { state: "INITIATE", error: "" }
                            })
                          }
                        />
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
                          defaultMessage={`
                        <div>
                          <strong>
                            Your information has been successfully submitted.
                          </strong>
                          <br />
                          <p>
                            To continue and activate your account, we are
                            sending an email to your email address for
                            confirmation.
                          </p>
                          <p>
                            If you couldn't find this mail in your Inbox folder,
                            check the Spam/Junk folder please.
                          </p>
                        </div>`}
                        />
                      </div>
                    )}

                    {this.state.signUpForm.state !== "SUCCESS" && (
                      <React.Fragment>
                        <SignUpForm
                          onProgress={
                            this.state.signUpForm.state === "SUBMITTING"
                          }
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
            ) : (
              <React.Fragment>
                <h1>{page.title}</h1>

                <div className="rich-content__content">
                  {page.body && (
                    <div dangerouslySetInnerHTML={{ __html: page.body }} />
                  )}
                </div>
              </React.Fragment>
            )}

            {page.slug === "contact-us" && (
              <div className="columns">
                <div className="column is-6">
                  <br />
                  <br />
                  <br />
                  <br />
                  <h2>
                    <FormattedMessage
                      id="page.contact-us.title"
                      defaultMessage="Get in touch with us!"
                    />
                  </h2>
                  <div
                    className={[
                      "animate",
                      this.state.contactForm.state === "SUCCESS"
                        ? "animate-hidden"
                        : ""
                    ].join(" ")}
                  >
                    {this.state.contactForm.state === "ERROR" && (
                      <div className="notification is-danger">
                        <button
                          className="delete"
                          onClick={() =>
                            this.setState({
                              contactForm: { state: "INITIATE", error: "" }
                            })
                          }
                        />
                        <strong>
                          <FormattedMessage
                            id="common.error"
                            defaultMessage="An error has occurred"
                          />
                        </strong>
                        <br />
                        <p>{this.state.contactForm.error}</p>
                      </div>
                    )}
                    <ContactForm
                      onProgress={this.state.contactForm.state === "SUBMITTING"}
                      onSubmit={formData => this.onContactFormSubmit(formData)}
                    />

                    <Recaptcha
                      ref={ref => (this.recaptchaContactFormRef = ref)}
                      sitekey={process.env.RECAPTCHA_KEY}
                      onResolved={() => this.onContactFormRecaptchaResolved()}
                      onError={() => this.onContactFormSRecaptchaError("ERROR")}
                      onExpired={() =>
                        this.onContactFormSRecaptchaError("EXPIRED")
                      }
                    />
                  </div>
                  <div
                    className={[
                      "animate hidden",
                      this.state.contactForm.state === "SUCCESS"
                        ? "animate-show"
                        : ""
                    ].join(" ")}
                  >
                    <div className="notification is-success">
                      <strong>
                        <FormattedMessage
                          id="page.contact-us.success"
                          defaultMessage="Your request has been successfully submitted."
                        />
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(Page);
