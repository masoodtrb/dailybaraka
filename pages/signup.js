import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Signup extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <div>
        <Head title="Sign up" />
        <Nav />

        <div className="page signup">
          <div className="container">
            <h1>Sign up</h1>
            <div className="columns">
              <div className="column is-6">
                <form onSubmit={e => this.onSubmit(e)}>
                  <div className="field">
                    <label className="label">First Name *</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Last Name *</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Your Last Name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Phone Number *</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email *</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button className="button is-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
