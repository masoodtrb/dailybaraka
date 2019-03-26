import React from "react";
import { Link } from "../routes";

const Nav = props => (
  <div className="header">
    <div className="top-nav">
      <div className="container">
        <div className="regions">
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
            <a href="">Sign in</a>
          </li>
          <li>
            <a href="">Signup</a>
          </li>
          <li>
            <a href="">Local Stores</a>
          </li>
          <li>
            <a href="">Commercial Enquiries</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="main-nav">
      <div className="container">
        <div className="main-nav__container">
          <ul>
            <li>
              <a href="">About us</a>
            </li>
            <li>
              <a href="">Contact us</a>
            </li>
            <li>
              <a href="">Sectors</a>
            </li>
            <li>
              <a href="">Accreditation Organisations</a>
            </li>
            <li>
              <a href="">Our Services</a>
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
                <div className="field has-addons">
                  <p className="control">
                    <span className="select">
                      <select>
                        <option defaultValue>All</option>
                        <option>Sector 1</option>
                        <option>Sector 2</option>
                      </select>
                    </span>
                  </p>
                  <p className="control search-input">
                    <input
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
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Nav;
