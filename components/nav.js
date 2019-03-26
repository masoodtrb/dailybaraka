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
        <div class="main-nav__container">
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
              <div class="main-nav__logo">
                <a href="/">
                  <img src="/static/images/logo.png" alt="daily baraka logo" />
                </a>
              </div>

              <div class="main-nav__search">
                <div class="field has-addons">
                  <p class="control">
                    <span class="select">
                      <select>
                        <option selected>All</option>
                        <option>Sector 1</option>
                        <option>Sector 2</option>
                      </select>
                    </span>
                  </p>
                  <p class="control search-input">
                    <input class="input" type="search" placeholder="Search" />
                  </p>
                  <p class="control">
                    <button type="submit" class="button">
                      <i class="fas fa-search" />
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
