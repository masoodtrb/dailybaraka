import React, { Component } from "react";

import * as sectorService from "../services/sector";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class Home extends Component {
  static async getInitialProps({ req }) {
    return { sectors: await sectorService.getAll() };
  }

  render() {
    return (
      <div>
        <Head title="Home" />
        <Nav page="index" />

        <div className="page home">
          <div className="container">
            <img
              className="home__logo"
              src="/static/images/logo-big.png"
              alt="daily baraka logo"
            />

            <div className="home__search">
              <form action="/search" method="get">
                <div className="field has-addons">
                  <p className="control">
                    <span className="select">
                      <select name="sector">
                        <option defaultValue value="all">
                          All
                        </option>
                        {this.props.sectors.result.map(sector => (
                          <option key={"sector-" + sector.id} value={sector.id}>
                            {sector.name}
                          </option>
                        ))}
                      </select>
                    </span>
                  </p>
                  <p className="control search-input">
                    <input
                      className="input"
                      name="q"
                      type="search"
                      placeholder="Search"
                    />
                  </p>
                  <p className="control">
                    <button type="submit" className="button">
                      <i className="fas fa-search" />
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
