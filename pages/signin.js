import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Signin extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <div>
        <Head title="Sign In" />
        <Nav />

        <div className="page signin">
          <div className="container">
            <div className="columns">
              <div className="column is-6 is-offset-3">
                <form action="/signin" method="post">
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-primary">Submit</button>
                    </div>

                    <div className="control forgot-pass">
                      <a href="/forgot-pass">Forgot Password?</a>
                    </div>
                  </div>
                </form>
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
