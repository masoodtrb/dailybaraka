import React, { Component } from "react";

import Head from "../components/head";
import Nav from "../components/nav";
import ResetPasswordForm from "../components/forms/resetPasswordForm";

import "../styles/main.scss";

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
              error:
                "Can not process the request. Type of error: " +
                response.status +
                ", response status: " +
                response.statusText
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
              error: json.detail
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
        <Head title="Reset Password" />
        <Nav />

        <div className="page reset-password">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Reset Password</h1>

                {this.state.resetPasswordForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.resetPasswordForm.error}</p>
                  </div>
                )}

                {this.state.resetPasswordForm.state === "SUCCESS" && (
                  <div className="notification is-success">
                    <strong>
                      Your password has been successfully updated.
                    </strong>
                    <br />
                    <p>You will be redirected to login page.</p>
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

export default ResetPassword;
