import React, { Component } from "react";
import parse from "html-react-parser";
import Recaptcha from "react-google-invisible-recaptcha";

import * as pageService from "../services/page";

import Head from "../components/head";
import Nav from "../components/nav";

import ContactForm from "../components/forms/contactForm";

import "../styles/main.scss";

class Page extends Component {
  static async getInitialProps({ query }) {
    return {
      page: await pageService.getPageContent(query.slug)
    };
  }

  state = {
    contactForm: { state: "INITIATE", error: "" },
    contactFormData: {}
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
            contactForm: {
              state: "ERROR",
              error: json.detail
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

  render() {
    const { page } = this.props;
    return (
      <div>
        <Head title={page.title} />
        <Nav />

        <div className="page rich-content">
          <div className="container">
            <h1>{page.title}</h1>
            <div className="rich-content__content">{parse(page.body)}</div>
            {page.slug === "contact-us" && (
              <div className="columns">
                <div className="column is-6">
                  <br />
                  <br />
                  <br />
                  <br />
                  <h2>Get in touch with us!</h2>
                  <div
                    className={[
                      "columns animate",
                      this.state.contactForm.state === "SUCCESS"
                        ? "animate-hidden"
                        : ""
                    ].join(" ")}
                  >
                    {this.state.contactForm.state === "ERROR" && (
                      <div className="notification is-danger">
                        <button className="delete" />
                        <strong>An error has occurred</strong>
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
                        Your request has been successfully submitted.
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

export default Page;
