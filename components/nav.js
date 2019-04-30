import React, { Component } from "react";
import Link from "next/link";
import withIntl from "../hoc/withIntl";

import { getUserToken, getCurrentUser } from "../services/account";
import { FormattedMessage, defineMessages } from "react-intl";

const messages = defineMessages({
  allSectors: {
    id: "sectors.all",
    defaultValue: "All"
  },
  wait: {
    id: "common.wait",
    defaultMessage: "Please wait..."
  },
  search: {
    id: "common.search",
    defaultMessage: "Search"
  }
});

class Nav extends Component {
  state = {
    user: null,
    sectors: [],
    showMenu: false
  };

  componentDidMount() {
    console.log("props");
    console.log(this.props);

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
        window.location.href = `/${this.props.intl.locale}/`;
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
                        id="nav.welcome"
                        values={{
                          user: (
                            <Link href={`/${this.props.intl.locale}/profile`}>
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
                      <Link href={`/${this.props.intl.locale}/signIn`}>
                        <a>
                          <FormattedMessage
                            id="common.login"
                            defaultMessage="Sign In"
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${this.props.intl.locale}/signUp`}>
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
                  <option>Language</option>
                  <option value="en">English - UK</option>
                  <option value="de">Deutsche - DE</option>
                </select>
              </div>
            </div>
            <ul>
              <li>
                <Link
                  href="/page?slug=about-us"
                  as={`/${this.props.intl.locale}/page/about-us`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.about-us"
                      defaultMessage="About us"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href="/page?slug=contact-us"
                  as={`/${this.props.intl.locale}/page/contact-us`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.contact-us"
                      defaultMessage="Contact us"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href="/page?slug=accreditation-organizations"
                  as={`/${
                    this.props.intl.locale
                  }/page/accreditation-organizations`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.accreditation-organizations"
                      defaultMessage="Accreditation Organizations"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href="/page?slug=services"
                  as={`/${this.props.intl.locale}/page/services`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.our-services"
                      defaultMessage="Our Services"
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-nav">
          <div className="container">
            <div className="main-nav__container">
              <div className="main-nav__logo is-hidden-desktop">
                <Link href={`/${this.props.intl.locale}/`}>
                  <a>
                    <img
                      src="/static/images/logo-small.png"
                      alt="daily baraka logo"
                    />
                  </a>
                </Link>
              </div>

              <ul>
                <li>
                  <Link href={`/${this.props.intl.locale}/local-stores`}>
                    <a>
                      <FormattedMessage
                        id="nav.local-stores"
                        defaultMessage="Local Stores"
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={`/${this.props.intl.locale}/sectors`}>
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
                    href={`/${this.props.intl.locale}/commercial-enquiries`}
                  >
                    <a>
                      <FormattedMessage
                        id="nav.commercial-enquiries"
                        defaultMessage="Commercial Enquiries"
                      />
                    </a>
                  </Link>
                </li>
              </ul>

              {this.props.page != "index" && (
                <React.Fragment>
                  <div className="main-nav__logo is-hidden-touch">
                    <Link href={`/${this.props.intl.locale}/`}>
                      <a>
                        <img
                          src="/static/images/logo.png"
                          alt="daily baraka logo"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="main-nav__search">
                    <form action={`/${this.props.locale}/search`} method="get">
                      <div className="field has-addons">
                        <p className="control">
                          <span className="select">
                            <select name="sector">
                              <option defaultValue value="all">
                                {this.props.intl.formatMessage(
                                  messages.allSectors
                                )}
                              </option>
                              {this.state.sectors &&
                              this.state.sectors.length === 0 ? (
                                <option disabled="disabled">
                                  {this.props.intl.formatMessage(messages.wait)}
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
                          <button type="submit" className="button">
                            <i className="fas fa-search" />
                          </button>
                        </p>
                      </div>
                    </form>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="mob-nav">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link href={`/${this.props.locale}/`}>
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
                    <Link href={`/${this.props.locale}/profile`}>
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
                    <Link href={`/${this.props.locale}/signIn`}>
                      <a>
                        <FormattedMessage
                          id="common.login"
                          defaultMessage="Sign In"
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${this.props.locale}/signUp`}>
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
                <Link href={`/${this.props.locale}/local-stores`}>
                  <a>
                    <FormattedMessage
                      id="nav.local-stores"
                      defaultMessage="Local Stores"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${this.props.locale}/sectors`}>
                  <a>
                    <FormattedMessage
                      id="nav.sectors"
                      defaultMessage="Sectors"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/${this.props.locale}/commercial-enquiries`}>
                  <a>
                    <FormattedMessage
                      id="nav.commercial-enquiries"
                      defaultMessage="Commercial Enquiries"
                    />
                  </a>
                </Link>
              </li>

              <li>
                <Link
                  href="/page?slug=about-us"
                  as={`/${this.props.locale}/page/about-us`}
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
                  href="/page?slug=contact-us"
                  as={`/${this.props.locale}/page/contact-us`}
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
                  href="/page?slug=accreditation-organizations"
                  href={`/${
                    this.props.locale
                  }/page/accreditation-organizations`}
                >
                  <a>
                    <FormattedMessage
                      id="nav.accreditation-organizations"
                      defaultMessage="Accreditation Organizations"
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
