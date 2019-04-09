import React, { Component } from "react";
import Link from "next/link";

class Nav extends Component {
  state = {
    user: null,
    sectors: []
  };

  componentDidMount() {
    // get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      token = sessionStorage.getItem("token");
    }
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

  onLogout(event) {
    event.preventDefault();

    this.setState({
      user: null
    });
  }

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
                      <a className="username" href="#">
                        {this.state.user.firstName}
                      </a>
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
                      <Link href="/signIn">Sign In</Link>
                    </li>
                    <li>
                      <Link href="/signUp">SignUp</Link>
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
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
              <li>
                <Link href="/accreditation-organizations">
                  Accreditation Organizations
                </Link>
              </li>
              <li>
                <Link href="/services">Our Services</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-nav">
          <div className="container">
            <div className="main-nav__container">
              <ul>
                <li>
                  <Link href="/local-stores">Local Stores</Link>
                </li>
                <li>
                  <Link href="/sectors">Sectors</Link>
                </li>

                <li>
                  <Link href="/commercial-enquiries">Commercial Enquiries</Link>
                </li>
              </ul>

              {this.props.page != "index" && (
                <React.Fragment>
                  <div className="main-nav__logo">
                    <Link href="/">
                      <img
                        src="/static/images/logo.png"
                        alt="daily baraka logo"
                      />
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
                                  <option value={sector.id}>
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
      </div>
    );
  }
}

export default Nav;
