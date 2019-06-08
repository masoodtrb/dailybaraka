import React, { Component } from "react";
import Link from "next/link";
import withIntl from "../hoc/withIntl";

import { getUserToken, getCurrentUser } from "../services/account";
import { FormattedMessage, defineMessages } from "react-intl";

const messages = defineMessages({
  allSectors: {
    id: "sectors.all",
    defaultMessage: "All"
  },
  wait: {
    id: "common.wait",
    defaultMessage: "Please wait..."
  },
  search: {
    id: "common.search",
    defaultMessage: "Search"
  },
  explore: {
    id: "nav.explore",
    defaultMessage: "Explore"
  },
  exploreSectors: {
    id: "nav.explore.sectors",
    defaultMessage: "All Sectors"
  },
  sectorsNotAvailable: {
    id: "nav.sectors-not-available",
    defaultMessage: "Sectors not available"
  }
});

class Nav extends Component {
  state = {
    user: null,
    sectors: null,
    showMenu: false
  };

  componentDidMount() {
    const token = getUserToken();
    this.setState({ user: JSON.parse(getCurrentUser()) });

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
          localStorage.setItem(
            "user",
            JSON.stringify({ ...json, token: token })
          );
          this.setState({
            user: { ...json, token: token }
          });
        });
    }

    // get all sectors
    fetch("/api/shop/categories/v1/search", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        size: 1000
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          sectors: json.result
        });
      });
  }

  onLogout = event => {
    event.preventDefault();

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    localStorage.removeItem("user");

    this.setState(
      {
        user: null
      },
      () => {
        window.location.href = `/${this.props.intl.locale}`;
      }
    );
  };

  toggleMenu = event => {
    event.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  changeLanguage = event => {
    event.preventDefault();

    const selectedLocal = event.target.value;

    window.location.href = `/${selectedLocal}/`;
  };

  render() {
    return (
      <div className="header">
        <div className="top-nav">
          <div className="container">
            <div className="top-nav__rightside">
              <ul>
                {this.state.user ? (
                  <React.Fragment>
                    <li>
                      <i className="fas fa-user" />
                      &nbsp;
                      <FormattedMessage
                        id="nav.about-us"
                        values={{
                          user: (
                            <Link
                              href={`/profile?lang=${this.props.intl.locale}`}
                              as={`/${this.props.intl.locale}/profile`}
                            >
                              <a className="username">
                                {this.state.user.firstName}
                              </a>
                            </Link>
                          )
                        }}
                        defaultMessage="Welcome {user}"
                      />
                      &nbsp;
                    </li>
                    <li>
                      <a href="#" onClick={e => this.onLogout(e)}>
                        <FormattedMessage
                          id="common.logout"
                          defaultMessage="Logout"
                        />
                      </a>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <Link
                        href={`/login?lang=${this.props.intl.locale}`}
                        as={`/${this.props.intl.locale}/signIn`}
                      >
                        <a>
                          <FormattedMessage
                            id="common.login"
                            defaultMessage="Sign In"
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/register?lang=${this.props.intl.locale}`}
                        as={`/${this.props.intl.locale}/signUp`}
                      >
                        <a>
                          <FormattedMessage
                            id="common.register"
                            defaultMessage="Sing Up"
                          />
                        </a>
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
              <div className="select">
                <select
                  defaultValue={this.props.intl.locale}
                  onChange={e => this.changeLanguage(e)}
                >
                  <option value="en">English - UK</option>
                  <option value="de">Deutsche - DE</option>
                  <option value="fr">Française - FR</option>
                  <option value="es">Español - ES</option>
                </select>
              </div>
            </div>
            <ul>
              <li>
                <Link
                  href={`/page?slug=welcome&lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/page/welcome`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.welcome"
                      defaultMessage="Welcome"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/page?slug=discover&lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/page/discover`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.discover"
                      defaultMessage="Discover"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/page?slug=accreditation-organizations&lang=${
                    this.props.intl.locale
                  }`}
                  as={`/${
                    this.props.intl.locale
                  }/page/accreditation-organizations`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.accreditation-organizations"
                      defaultMessage="Accreditation Orgs"
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {this.props.page != "index" && (
          <div className="main-nav">
            <div className="container">
              <div className="main-nav__container">
                <div className="main-nav__logo">
                  <Link
                    href={`/index?lang=${this.props.intl.locale}`}
                    as={`/${this.props.intl.locale}`}
                  >
                    <a>
                      <img
                        src="/static/images/logo-white.png"
                        alt="daily baraka logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="main-nav__explore">
                  <div>
                    <span>
                      <i className="fas fa-chevron-down" />
                      {this.props.intl.formatMessage(messages.explore)}
                    </span>
                    <ul>
                      <li>
                        <Link
                          href={`/sectors?lang=${this.props.intl.locale}`}
                          as={`/${this.props.intl.locale}/sectors`}
                        >
                          <a>
                            {this.props.intl.formatMessage(
                              messages.exploreSectors
                            )}
                          </a>
                        </Link>
                      </li>
                      {!this.state.sectors ? (
                        <li>{this.props.intl.formatMessage(messages.wait)}</li>
                      ) : this.state.sectors.length === 0 ? (
                        <li>
                          {this.props.intl.formatMessage(
                            messages.sectorsNotAvailable
                          )}
                        </li>
                      ) : (
                        this.state.sectors.map(sector => (
                          <li key={sector.id}>
                            <Link
                              href={`/sector?id=${sector.id}&name=${
                                sector.name
                              }&lang=${this.props.intl.locale}`}
                              as={`/${this.props.intl.locale}/sector/${
                                sector.id
                              }/${sector.name}`}
                            >
                              <a>{sector.name}</a>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
                <div className="main-nav__search">
                  <form
                    action={`/${this.props.intl.locale}/search`}
                    method="get"
                  >
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
                              {this.props.intl.formatMessage(
                                messages.allSectors
                              )}
                            </option>
                            {!this.state.sectors ? (
                              <option disabled="disabled">
                                {this.props.intl.formatMessage(messages.wait)}
                              </option>
                            ) : this.state.sectors.length === 0 ? (
                              <option disabled="disabled">
                                {this.props.intl.formatMessage(
                                  messages.sectorsNotAvailable
                                )}
                              </option>
                            ) : (
                              this.state.sectors.map(sector => (
                                <option
                                  key={"sector-" + sector.id}
                                  value={sector.id}
                                >
                                  {sector.name}
                                </option>
                              ))
                            )}
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
              </div>
            </div>
          </div>
        )}

        <div className="mob-nav">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link href={`/${this.props.intl.locale}`}>
                <a className="navbar-item">
                  <img src="/static/images/logo.png" alt="Daily Baraka" />
                </a>
              </Link>

              <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                onClick={e => this.toggleMenu(e)}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
          </nav>
          <div
            className={["navbar-menu", this.state.showMenu && "active"].join(
              " "
            )}
            id="navMenu"
          >
            <ul>
              {this.state.user ? (
                <React.Fragment>
                  <li>
                    <Link
                      href={`/profile?lang=${this.props.intl.locale}`}
                      as={`/${this.props.intl.locale}/profile`}
                    >
                      <a className="username">
                        <i className="fas fa-user" />
                        &nbsp;
                        <FormattedMessage
                          id="nav.profile"
                          defaultMessage="Profile"
                        />
                      </a>
                    </Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                    <Link
                      href={`/login?lang=${this.props.intl.locale}`}
                      as={`/${this.props.intl.locale}/signIn`}
                    >
                      <a>
                        <FormattedMessage
                          id="common.login"
                          defaultMessage="Sign In"
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/register?lang=${this.props.intl.locale}`}
                      as={`/${this.props.intl.locale}/signUp`}
                    >
                      <a>
                        <FormattedMessage
                          id="common.register"
                          defaultMessage="Sign Up"
                        />
                      </a>
                    </Link>
                  </li>
                </React.Fragment>
              )}
              <li>
                <Link
                  href={`/welcome?lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/welcome`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.welcome"
                      defaultMessage="Welcome"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/sectors?lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/sectors`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.sectors"
                      defaultMessage="Sectors"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/local-stores?lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/local-stores`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.local-stores"
                      defaultMessage="nav.local-stores"
                    />
                  </a>
                </Link>
              </li>

              <li>
                <Link
                  href={`/page?slug=about-us&lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/page/about-us`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.about-us"
                      defaultMessage="About Us"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/page?slug=contact-us&lang=${this.props.intl.locale}`}
                  as={`/${this.props.intl.locale}/page/contact-us`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.contact-us"
                      defaultMessage="Contact Us"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={`/page?slug=accreditation-organizations&lang=${
                    this.props.intl.locale
                  }`}
                  href={`/${
                    this.props.intl.locale
                  }/page/accreditation-organizations`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.accreditation-organizations"
                      defaultMessage="Accreditation Orgs"
                    />
                  </a>
                </Link>
              </li>
              {this.state.user && (
                <li>
                  <a href="#" onClick={e => this.onLogout(e)}>
                    <FormattedMessage id="nav.logout" defaultMessage="Logout" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(Nav);
