import React from "react";
import { Link } from "../routes";

const Nav = props => (
  <div className="header">
    <div className="top-nav">
      <div className="container">
        <div className="top-nav__rightside">
          <ul>
            <li>
              <a href="/signin">Sign in</a>
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </ul>

          <div className="select">
            <select>
              <option>Region</option>
              <option>English</option>
              <option>German</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>

        <ul>
          <li>
            <a href="/about">About us</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
          <li>
            <a href="/accreditation">Accreditation Organisations</a>
          </li>
          <li>
            <a href="/services">Our Services</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="main-nav">
      <div className="container">
        <div className="main-nav__container">
          <ul>
            <li>
              <a href="">Local Stores</a>
            </li>
            <li>
              <a href="/sectors">Sectors</a>
            </li>

            <li>
              <a href="/commercial-enquiries">Commercial Enquiries</a>
            </li>
          </ul>

          {props.page != "index" && (
            <React.Fragment>
              <div className="main-nav__logo">
                <a href="/">
                  <img src="/static/images/logo.png" alt="daily baraka logo" />
                </a>
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
                          <option value="sector-1">Sector 1</option>
                          <option value="sector-2">Sector 2</option>
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

export default Nav;
