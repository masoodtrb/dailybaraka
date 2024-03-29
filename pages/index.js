import React, { Component } from "react";
import Link from "next/link";
import { defineMessages } from "react-intl";
import withIntl from "../hoc/withIntl";

import * as sectorService from "../services/sector";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

const messages = defineMessages({
  title: {
    id: "home.title",
    defaultMessage: "Home"
  },
  search: {
    id: "common.search",
    defaultMessage: "Search"
  },
  allSectors: {
    id: "sectors.all",
    defaultMessage: "All"
  }
});

class Home extends Component {
  static async getInitialProps({ query }) {
    return { sectors: await sectorService.getAll(query.lang) };
  }

  render() {
    return (
      <div>
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav page="index" />

        <div className="page home">
          <div className="container">
            <img
              className="home__logo"
              src="/static/images/logo-lg.png"
              alt="daily baraka logo"
            />

            <div className="home__search">
              <form action={`/${this.props.intl.locale}/search`} method="get">
                <div className="field has-addons">
                  <p className="control search-input">
                    <input
                      name="q"
                      className="input"
                      type="search"
                      placeholder={this.props.intl.formatMessage(
                        messages.search
                      )}
                    />
                  </p>
                  <p className="control">
                    <span className="select">
                      <select name="sector">
                        <option defaultValue value="all">
                          {this.props.intl.formatMessage(messages.allSectors)}
                        </option>
                        {this.props.sectors &&
                          this.props.sectors.result &&
                          this.props.sectors.result.map(sector => (
                            <option
                              key={"sector-" + sector.id}
                              value={sector.id}
                            >
                              {sector.name}
                            </option>
                          ))}
                      </select>
                    </span>
                  </p>
                  <p className="control">
                    <button type="submit" className="button">
                      <i className="fas fa-search" />
                    </button>
                  </p>
                </div>
              </form>
            </div>

            <ul className="home__sectors">
              {this.props.sectors &&
                this.props.sectors.result &&
                this.props.sectors.result.map(sector => (
                  <li key={sector.id}>
                    <Link
                      href={`/sector?id=${sector.id}&name=${sector.name}&lang=${
                        this.props.intl.locale
                      }`}
                      as={`/${this.props.intl.locale}/sector/${sector.id}/${
                        sector.name
                      }`}
                    >
                      <a>{sector.name}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(Home);
