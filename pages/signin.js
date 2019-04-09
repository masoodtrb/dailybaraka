import React, { Component } from "react";
import { withRouter } from "next/router";

import Head from "../components/head";
import Nav from "../components/nav";

import SignInForm from "../components/forms/signInForm";

import "../styles/main.scss";

class SignIn extends Component {
  state = {
    signInForm: { state: "INITIATE", error: "" }
  };

  onSignInSubmit = formData => {
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
        username: formData.email
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({
            signInForm: {
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
      .then(json => {
        if (json.status === 400) {
          this.setState({
            signInForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          return;
        }
        if (formData.rememberMe) {
          localStorage.setItem("token", json.id_token);
        } else {
          sessionStorage.setItem("token", json.id_token);
        }

        this.props.router.push("/");
      });
  };

  render() {
    return (
      <div>
        <Head title="Sign In" />
        <Nav />

        <div className="page signIn">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Sign In</h1>

                {this.state.signInForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.signInForm.error}</p>
                  </div>
                )}

                <SignInForm
                  onProgress={this.state.signInForm.state === "SUBMITTING"}
                  onSubmit={formData => this.onSignInSubmit(formData)}
                />
                <br />
                <br />
                <p className="note has-text-centered">
                  Do not have an account? <a href="/signUp">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
