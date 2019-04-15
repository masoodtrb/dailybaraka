import React, { Component } from "react";
import Link from "next/link";
import moment from "moment";

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
    userData: null,
    coupons: null,
    currentTab: "PROFILE"
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

      fetch("/api/shop/coupons/v1/my-coupon-bank", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.setState({
            coupons: json
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

  onChangeTab = (event, tabState) => {
    event.preventDefault();
    this.setState({ currentTab: tabState });
  };

  render() {
    const { currentTab, coupons } = this.state;
    return (
      <div>
        <Head title="User Profile" />
        <Nav />

        <div className="page signUp">
          <div className="container">
            <h1>My Profile</h1>

            <div className="tabs">
              <ul>
                <li className={currentTab === "PROFILE" ? "is-active" : ""}>
                  <a href="#" onClick={e => this.onChangeTab(e, "PROFILE")}>
                    Profile Info
                  </a>
                </li>
                <li className={currentTab === "COUPONS" ? "is-active" : ""}>
                  <a href="#" onClick={e => this.onChangeTab(e, "COUPONS")}>
                    My Coupons
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={[
                "tab-content",
                currentTab === "PROFILE" ? "active" : null
              ].join(" ")}
            >
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
                      onSubmit={formData =>
                        this.onChangePasswordSubmit(formData)
                      }
                    />
                  </fieldset>
                </div>
              </div>
            </div>
            <div
              className={[
                "tab-content",
                currentTab === "COUPONS" ? "active" : null
              ].join(" ")}
            >
              {!coupons || !coupons.result ? (
                <div className="notification is-info">Please wait...</div>
              ) : coupons.result && coupons.result.length === 0 ? (
                <div className="notification is-info">
                  You haven't any coupons yet.
                </div>
              ) : (
                <div className="columns is-multiline">
                  {coupons.result.map(coupon => (
                    <div className="column is-3">
                      <div className="card">
                        <div className="card-image">
                          <figure className="image is-4by3">
                            <img
                              src={
                                coupon.cover
                                  ? process.env.API_URL +
                                    "api/shop/general/v1/file/" +
                                    coupon.cover.id
                                  : "/static/images/128x128.png"
                              }
                            />
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-left">
                              <figure className="image is-48x48">
                                <img
                                  src={
                                    coupon.logo
                                      ? process.env.API_URL +
                                        "api/shop/general/v1/file/" +
                                        coupon.logo.id
                                      : "/static/images/128x128.png"
                                  }
                                  alt="Placeholder image"
                                />
                              </figure>
                            </div>
                            <div className="media-content">
                              <p className="title is-4">{coupon.name}</p>
                            </div>
                          </div>

                          <div className="content">
                            {coupon.description}
                            <br />
                            {coupon.termsConditions}
                            <br />
                            <i className="fas fa-clock" />
                            &nbsp;Expiry Date:
                            <time>
                              &nbsp;
                              {moment(coupon.expireDate * 1000).format("ll")}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
