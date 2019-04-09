import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";
import SignUpForm from "../components/forms/signUpForm";

class SignUp extends Component {
  state = {
    signUpForm: { state: "INITIATE", error: "" },
    enteredEmail: ""
  };

  onSignUpSubmit = formData => {
    this.setState({
      signUpForm: { state: "SUBMITTING" },
      enteredEmail: formData.email
    });
    fetch("/api/shop/account/v1/register", {
      crossDomain: true,
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
        lastName: formData.lastName
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            signUpForm: {
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
        if (json.status === 400) {
          this.setState({
            signUpForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          return;
        }

        this.setState({
          signUpForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  render() {
    return (
      <div>
        <Head title="Sign up" />
        <Nav />

        <div className="page signUp">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Sign Up</h1>

                {this.state.signUpForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.signUpForm.error}</p>
                  </div>
                )}

                {this.state.signUpForm.state === "SUCCESS" && (
                  <div className="notification is-success">
                    <strong>
                      Your information has been successfully submitted.
                    </strong>
                    <br />
                    <p>
                      To continue and activate your account, we are sending an
                      email to "{this.state.enteredEmail}" for confirmation your
                      mail address.
                    </p>
                    <p>
                      If you couldn't find the mail in the Inbox folder, check
                      your Spam/Junk folder please.
                    </p>
                  </div>
                )}

                {this.state.signUpForm.state !== "SUCCESS" && (
                  <SignUpForm
                    onProgress={this.state.signUpForm.state === "SUBMITTING"}
                    onSubmit={formData => this.onSignUpSubmit(formData)}
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

export default SignUp;
