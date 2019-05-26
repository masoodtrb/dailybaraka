import React, { Component } from "react";

import {
  FormattedHTMLMessage,
  FormattedMessage,
  defineMessages
} from "react-intl";

import withIntl from "../hoc/withIntl";

import Head from "../components/head";
import Nav from "../components/nav";
import ResetPasswordForm from "../components/forms/resetPasswordForm";

import "../styles/main.scss";

const messages = defineMessages({
  title: {
    id: "reset-password.title",
    defaultMessage: "Reset Password"
  },
  resetPasswordError: {
    id: "reset-password.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  }
});

class ResetPassword extends Component {
  state = {
    resetPasswordForm: { state: "INITIATE", error: "" }
  };

  onResetPasswordSubmit = formData => {
    this.setState({
      resetPasswordForm: { state: "SUBMITTING" }
    });
    fetch("/api/shop/account/v1/reset-password/finish", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        key: this.props.url.query.key,
        newPassword: formData.password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            resetPasswordForm: {
              state: "ERROR",
              error: this.props.intl.formatMessage(
                messages.resetPasswordError,
                {
                  status: response.status,
                  statusText: response.statusText
                }
              )
            }
          });
        }
      })
      .then(text => (text.length ? JSON.parse(text) : {}))
      .then(json => {
        if (json.status >= 300) {
          this.setState({
            resetPasswordForm: {
              state: "ERROR",
              error: json.detail || json.title
            }
          });
          return;
        }

        this.setState({
          resetPasswordForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  render() {
    return (
      <div>
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav />

        <div className="page reset-password">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>
                  <FormattedMessage
                    id="reset-password.title"
                    defaultMessage="Reset Password"
                  />
                </h1>

                {this.state.resetPasswordForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>
                      <FormattedMessage
                        id="common.error"
                        defaultMessage="An error has occurred"
                      />
                    </strong>
                    <br />
                    <p>{this.state.resetPasswordForm.error}</p>
                  </div>
                )}

                {this.state.resetPasswordForm.state === "SUCCESS" && (
                  <div className="notification is-success">
                    <FormattedHTMLMessage
                      id="reset-password.success"
                      defaultMessage="<strong>Your password has been successfully updated.</strong><br /><p>You will be redirected to login page.</p>"
                    />
                  </div>
                )}

                {this.state.resetPasswordForm.state !== "SUCCESS" && (
                  <ResetPasswordForm
                    onProgress={
                      this.state.resetPasswordForm.state === "SUBMITTING"
                    }
                    onSubmit={formData => this.onResetPasswordSubmit(formData)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(ResetPassword);
