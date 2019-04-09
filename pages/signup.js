import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";
import SignupFormForm from "../components/forms/signupForm";

class Signup extends Component {
  state = {
    signupForm: { state: "INITIATE", error: "" }
  };

  onSignupSubmit = formData => {
    fetch("http://daily.irresno.ir/api/shop/account/v1/register", {
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
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/");
      } else {
        this.setState({
          signupForm: {
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
        <Head title="Sign up" />
        <Nav />

        <div className="page signup">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <h1>Sign Up</h1>

                {this.state.signupForm.state === "ERROR" && (
                  <div className="notification is-danger">
                    <button className="delete" />
                    <strong>An error has occurred</strong>
                    <br />
                    <p>{this.state.signupForm.error}</p>
                  </div>
                )}

                <SignupFormForm
                  onProgress={this.state.signupForm.state === "SUBMITTING"}
                  onSubmit={formData => this.onSignupSubmit(formData)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
