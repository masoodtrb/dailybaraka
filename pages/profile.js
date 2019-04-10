import React, { Component } from "react";
import Link from "next/link";

import { getUserToken } from "../services/account";

import Head from "../components/head";
import Nav from "../components/nav";
import UpdateProfileForm from "../components/forms/updateProfileForm";
import ChangePasswordForm from "../components/forms/changePasswordForm";

import "../styles/main.scss";

class Profile extends Component {
  state = {
    updateProfileForm: { state: "INITIATE", error: "" },
    changePasswordForm: { state: "INITIATE", error: "" },
    userData: null
  };

  componentDidMount() {
    const token = getUserToken();

    if (token) {
      fetch("/api/shop/account/v1/current-user", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.setState({
            userData: {
              firstName: json.firstName,
              lastName: json.lastName
            }
          });
        });
    } else {
      window.location.href = "/";
    }
  }

  onUpdateProfileSubmit = formData => {
    this.setState({
      updateProfileForm: { state: "SUBMITTING" }
    });

    fetch("/api/shop/account/v1/my-update", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + getUserToken()
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            updateProfileForm: {
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
            updateProfileForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          return;
        }

        this.setState({
          updateProfileForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  onChangePasswordSubmit = formData => {
    this.setState({
      changePasswordForm: { state: "SUBMITTING" }
    });

    fetch("/api/shop/account/v1/change-my-password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + getUserToken()
      },
      body: JSON.stringify({
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            changePasswordForm: {
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
            changePasswordForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          return;
        }

        this.setState({
          changePasswordForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  render() {
    return (
      <div>
        <Head title="User Profile" />
        <Nav />

        <div className="page signUp">
          <div className="container">
            <h1>User Profile</h1>

            <div className="columns">
              <div className="column is-6">
                <fieldset>
                  <legend>Update Profile</legend>
                  <br />
                  {this.state.updateProfileForm.state === "ERROR" && (
                    <div className="notification is-danger">
                      <button className="delete" />
                      <strong>An error has occurred</strong>
                      <br />
                      <p>{this.state.updateProfileForm.error}</p>
                    </div>
                  )}

                  {this.state.updateProfileForm.state === "SUCCESS" && (
                    <div className="notification is-success">
                      <strong>
                        Your profile has been successfully updated.
                      </strong>
                    </div>
                  )}

                  {this.state.userData ? (
                    <UpdateProfileForm
                      defaultValues={this.state.userData}
                      onProgress={
                        this.state.updateProfileForm.state === "SUBMITTING"
                      }
                      onSubmit={formData =>
                        this.onUpdateProfileSubmit(formData)
                      }
                    />
                  ) : (
                    <p>Please wait...</p>
                  )}
                </fieldset>
              </div>

              <div className="column is-6">
                <fieldset>
                  <legend>Change Password</legend>
                  <br />
                  {this.state.changePasswordForm.state === "ERROR" && (
                    <div className="notification is-danger">
                      <button className="delete" />
                      <strong>An error has occurred</strong>
                      <br />
                      <p>{this.state.changePasswordForm.error}</p>
                    </div>
                  )}

                  {this.state.changePasswordForm.state === "SUCCESS" && (
                    <div className="notification is-success">
                      <strong>
                        Your password has been changed successfully.
                      </strong>
                    </div>
                  )}

                  <ChangePasswordForm
                    onProgress={
                      this.state.changePasswordForm.state === "SUBMITTING"
                    }
                    onSubmit={formData => this.onChangePasswordSubmit(formData)}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
