import React, { Component } from "react";
import Link from "next/link";

import { getUserToken } from "../services/account";

class Nav extends Component {
  state = {
    user: null,
    sectors: [],
    showMenu: false
  };

  componentDidMount() {
    // get token from localStorage
    const token = getUserToken();

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
          this.setState({
            user: { ...json, token: token }
          });
        });
    }

    // get all sectors
    fetch("/api/shop/categories/v1/search", {
      method: "POST"
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

    this.setState({
      user: null
    });
  };

  toggleMenu = event => {
    event.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu
    });
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
                      &nbsp; Welcome{" "}
                      <Link href="/profile">
                        <a className="username">{this.state.user.firstName}</a>
                      </Link>
                    </li>
                    <li>
                      <a href="#" onClick={e => this.onLogout(e)}>
                        Logout
                      </a>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <Link href="/signIn">
                        <a>Sign In</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/signUp">
                        <a>SignUp</a>
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
              <div className="select">
                <select defaultValue="en-uk">
                  <option>Language</option>
                  <option value="en-uk">English - UK</option>
                </select>
              </div>
            </div>
            <ul>
              <li>
                <Link href="/page/about-us">
                  <a>About us</a>
                </Link>
              </li>
              <li>
                <Link href="/page/contact-us">
                  <a>Contact us</a>
                </Link>
              </li>
              <li>
                <Link href="/page/accreditation-organizations">
                  <a>Accreditation Organizations</a>
                </Link>
              </li>
              <li>
                <Link href="/page/services">
                  <a>Our Services</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-nav">
          <div className="container">
            <div className="main-nav__container">
              <div className="main-nav__logo is-hidden-desktop">
                <Link href="/">
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
                  <Link href="/local-stores">
                    <a>Local Stores</a>
                  </Link>
                </li>
                <li>
                  <Link href="/sectors">
                    <a>Sectors</a>
                  </Link>
                </li>
                <li>
                  <Link href="/commercial-enquiries">
                    <a>Commercial Enquiries</a>
                  </Link>
                </li>
              </ul>

              {this.props.page != "index" && (
                <React.Fragment>
                  <div className="main-nav__logo is-hidden-touch">
                    <Link href="/">
                      <a>
                        <img
                          src="/static/images/logo.png"
                          alt="daily baraka logo"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="main-nav__search">
                    <form action="/search" method="get">
                      <div className="field has-addons">
                        <p className="control">
                          <span className="select">
                            <select name="sector">
                              <option defaultValue value="all">
                                All
                              </option>
                              {this.state.sectors &&
                              this.state.sectors.length === 0 ? (
                                <option disabled="disabled">Loading...</option>
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
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="mob-nav">
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <Link href="/">
                <a class="navbar-item">
                  <img src="/static/images/logo.png" alt="Daily Baraka" />
                </a>
              </Link>

              <a
                role="button"
                class="navbar-burger"
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
            class={["navbar-menu", this.state.showMenu && "active"].join(" ")}
            id="navMenu"
          >
            <ul>
              <li>
                <Link href="/signIn">
                  <a>Sign In</a>
                </Link>
              </li>
              <li>
                <Link href="/signUp">
                  <a>SignUp</a>
                </Link>
              </li>
              <li>
                <Link href="/local-stores">
                  <a>Local Stores</a>
                </Link>
              </li>
              <li>
                <Link href="/sectors">
                  <a>Sectors</a>
                </Link>
              </li>
              <li>
                <Link href="/commercial-enquiries">
                  <a>Commercial Enquiries</a>
                </Link>
              </li>

              <li>
                <Link href="/page/about-us">
                  <a>About us</a>
                </Link>
              </li>
              <li>
                <Link href="/page/contact-us">
                  <a>Contact us</a>
                </Link>
              </li>
              <li>
                <Link href="/page/accreditation-organizations">
                  <a>Accreditation Organizations</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
