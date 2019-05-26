import React, { Component } from "react";
import Link from "next/link";
import moment from "moment";
import { defineMessages, FormattedMessage } from "react-intl";

import withIntl from "../hoc/withIntl";

import { getUserToken } from "../services/account";

import Head from "../components/head";
import Nav from "../components/nav";
import UpdateProfileForm from "../components/forms/updateProfileForm";
import ChangePasswordForm from "../components/forms/changePasswordForm";

import "../styles/main.scss";

const IMAGES_TYPES = ["image/jpeg", "image/png", "image/bmp", "image/gif"];

const messages = defineMessages({
  title: {
    id: "profile.title",
    defaultMessage: "My Profile"
  },
  updateProfileError: {
    id: "profile.update.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  },
  changePasswordError: {
    id: "profile.change-password.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  },
  updateProfileImage: {
    id: "profile.update.image.error",
    defaultMessage:
      "Can not process the request. Type of error: {status}, response status: {statusText}"
  },
  updateProfileImageFormatError: {
    id: "profile.update.image.format-error",
    defaultMessage:
      "<p>Selected file is not supported. Please upload an image for your profile.<br />Supported formats: (JPG, PNG, GIF, BMP)</p>"
  },
  updateProfileImageSizeError: {
    id: "profile.update.image.size-error",
    defaultMessage:
      "<p>Selected image file is too heavy. Max supported file size is 1.5MB.</p>"
  }
});

class Profile extends Component {
  state = {
    updateProfileForm: { state: "INITIATE", error: "" },
    changePasswordForm: { state: "INITIATE", error: "" },
    userData: null,
    coupons: null,
    currentTab: "PROFILE",
    uploadedImageId: null,
    userImage: null
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
            userData: json
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
      window.location.href = `/${this.props.intl.locale}/login?returnUrl=/${
        this.props.intl.locale
      }/profile`;
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
        lastName: formData.lastName,
        profilePicture: {
          id: this.state.uploadedImageId
            ? this.state.uploadedImageId
            : formData.profilePicture
            ? formData.profilePicture.id
            : null
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            updateProfileForm: {
              state: "ERROR",
              error: this.props.intl.formatMessage(
                messages.updateProfileError,
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
            updateProfileForm: {
              state: "ERROR",
              error: json.detail || json.title
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
              error: this.props.intl.formatMessage(
                messages.changePasswordError,
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
            changePasswordForm: {
              state: "ERROR",
              error: json.detail || json.title
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

  onImageUpdated = event => {
    if (!event.target.files && !event.target.files[0]) {
      this.setState({
        updateProfileForm: {
          state: "INITIAL"
        }
      });
      return;
    }

    const imageFile = event.target.files[0];

    if (IMAGES_TYPES.indexOf(imageFile.type) < 0) {
      this.setState({
        updateProfileForm: {
          state: "ERROR",
          error: this.props.intl.formatHTMLMessage(
            messages.updateProfileImageFormatError
          )
        }
      });
      return;
    }

    if (imageFile.size / 1024 / 1024 > 1.5) {
      this.setState({
        updateProfileForm: {
          state: "ERROR",
          error: this.props.intl.formatHTMLMessage(
            messages.updateProfileImageSizeError
          )
        }
      });
      return;
    }

    var reader = new FileReader();
    reader.onload = e => {
      this.setState({
        userImage: e.target.result
      });
    };
    reader.readAsDataURL(imageFile);

    const formData = new FormData();
    formData.append("file", imageFile);

    fetch("/api/shop/general/v1/upload-file", {
      method: "POST",
      headers: {
        authorization: "Bearer " + getUserToken()
        // "content-type": "multipart/form-data"
      },
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            updateProfileForm: {
              state: "ERROR",
              error: this.props.intl.formatMessage(
                messages.updateProfileImage,
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
            updateProfileForm: {
              state: "ERROR",
              error: json.detail || json.title
            }
          });
          return;
        }
        this.setState({
          uploadedImageId: json.data,
          updateProfileForm: {
            state: "INITIAL"
          }
        });
      });
  };

  render() {
    const { currentTab, coupons } = this.state;
    return (
      <div>
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav />

        <div className="page profile">
          <div className="container">
            <h1>
              <FormattedMessage
                id="profile.title"
                defaultMessage="My Profile"
              />
            </h1>

            <div className="tabs">
              <ul>
                <li className={currentTab === "PROFILE" ? "is-active" : ""}>
                  <a href="#" onClick={e => this.onChangeTab(e, "PROFILE")}>
                    <FormattedMessage
                      id="profile.tab-title"
                      defaultMessage="Profile Info"
                    />
                  </a>
                </li>
                <li className={currentTab === "COUPONS" ? "is-active" : ""}>
                  <a href="#" onClick={e => this.onChangeTab(e, "COUPONS")}>
                    <FormattedMessage
                      id="profile.coupons.title"
                      defaultMessage="My Coupons"
                    />
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
                    <legend>
                      <FormattedMessage
                        id="profile.update.title"
                        defaultMessage="Update Profile"
                      />
                    </legend>
                    <br />
                    {this.state.updateProfileForm.state === "ERROR" && (
                      <div className="notification is-danger">
                        <button
                          className="delete"
                          onClick={() =>
                            this.setState({
                              updateProfileForm: {
                                state: "INITIATE",
                                error: ""
                              }
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
                        <p>{this.state.updateProfileForm.error}</p>
                      </div>
                    )}

                    {this.state.updateProfileForm.state === "SUCCESS" && (
                      <div className="notification is-success">
                        <strong>
                          <FormattedMessage
                            id="profile.update.success"
                            defaultMessage="Your profile has been successfully updated."
                          />
                        </strong>
                      </div>
                    )}

                    {this.state.userData ? (
                      <React.Fragment>
                        <div className="profile__image">
                          <input
                            type="file"
                            onChange={e => this.onImageUpdated(e)}
                          />
                          <img
                            src={
                              this.state.userImage
                                ? this.state.userImage
                                : this.state.userData.profilePicture
                                ? process.env.API_URL +
                                  "/api/shop/general/v1/file/" +
                                  this.state.userData.profilePicture.id
                                : "/static/images/placeholder-profile.jpg"
                            }
                          />
                        </div>
                        <UpdateProfileForm
                          defaultValues={this.state.userData}
                          onProgress={
                            this.state.updateProfileForm.state === "SUBMITTING"
                          }
                          onSubmit={formData =>
                            this.onUpdateProfileSubmit(formData)
                          }
                        />
                      </React.Fragment>
                    ) : (
                      <p>
                        <FormattedMessage
                          id="common.wait"
                          defaultMessage="Please wait..."
                        />
                      </p>
                    )}
                  </fieldset>
                </div>
                <div className="column is-6">
                  <fieldset>
                    <legend>
                      <FormattedMessage
                        id="profile.change-password.title"
                        defaultMessage="Change Password"
                      />
                    </legend>
                    <br />
                    {this.state.changePasswordForm.state === "ERROR" && (
                      <div className="notification is-danger">
                        <button
                          className="delete"
                          onClick={() =>
                            this.setState({
                              changePasswordForm: {
                                state: "INITIATE",
                                error: ""
                              }
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
                        <p>{this.state.changePasswordForm.error}</p>
                      </div>
                    )}

                    {this.state.changePasswordForm.state === "SUCCESS" ? (
                      <div className="notification is-success">
                        <strong>
                          <FormattedMessage
                            id="profile.change-password.success"
                            defaultMessage="Your password has been changed successfully."
                          />
                        </strong>
                      </div>
                    ) : (
                      <ChangePasswordForm
                        onProgress={
                          this.state.changePasswordForm.state === "SUBMITTING"
                        }
                        onSubmit={formData =>
                          this.onChangePasswordSubmit(formData)
                        }
                      />
                    )}
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
                <div className="notification is-info">
                  <FormattedMessage
                    id="common.wait"
                    defaultMessage="Please wait..."
                  />
                </div>
              ) : coupons.result && coupons.result.length === 0 ? (
                <div className="notification is-info">
                  <FormattedMessage
                    id="profile.coupons.empty"
                    defaultMessage="You haven't any coupons yet."
                  />
                </div>
              ) : (
                <div className="columns is-multiline">
                  {coupons.result.map(coupon => (
                    <div key={"coupon-" + coupon.id} className="column is-3">
                      <div className="card">
                        <div className="card-image">
                          <figure className="image is-4by3">
                            <img
                              src={
                                coupon.cover
                                  ? process.env.API_URL +
                                    "/api/shop/general/v1/file/" +
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
                                        "/api/shop/general/v1/file/" +
                                        coupon.logo.id
                                      : "/static/images/128x128.png"
                                  }
                                  alt="coupon image"
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
                            &nbsp;
                            <FormattedMessage
                              id="profile.coupons.expiry-date"
                              defaultMessage="Expiry Date:"
                            />
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

export default withIntl(Profile);
