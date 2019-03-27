import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Product extends Component {
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
                  <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Username" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                      <input
                        class="input"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-primary">Submit</button>
                    </div>

                    <div class="control forgot-pass">
                      <a href="/forgot-pass">Forgot Password?</a>
                    </div>
                  </div>
                </form>
                <br />
                <br />
                <p className="note has-text-centered">
                  Do not have an account? <a href="signup">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
