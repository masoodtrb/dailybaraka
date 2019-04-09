import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";
import SigninForm from "./../components/forms/signinForm";

class Signin extends Component {
  state = {
    signinForm: { state: "INITIATE", error: "" }
  };

  onSigninSubmit = formData => {
    fetch("http://daily.irresno.ir/api/panel/authenticate/v1/login", {
      crossDomain: true,
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        password: formData.password,
        rememberMe: formData.rememberMe,
        username: formData.username
      })
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/");
      } else {
        this.setState({
          signinForm: {
            state: "ERROR",
            error:
              "Can not process the request. Type of error: " +
              response.status +
              ", response status: " +
              response.statusText
          }
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Head title="Sign In" />
        <Nav />

        <div className="page signin">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Sign In</h1>

                {this.state.signinForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.signinForm.error}</p>
                  </div>
                )}

                <SigninForm
                  onProgress={this.state.signinForm.state === "SUBMITTING"}
                  onSubmit={formData => this.onSigninSubmit(formData)}
                />
                <br />
                <br />
                <p className="note has-text-centered">
                  Do not have an account? <a href="/signup">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
