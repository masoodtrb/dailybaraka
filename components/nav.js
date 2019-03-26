import React from "react";
import { Link } from "../routes";

const Nav = () => (
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
        </ul>
      </div>
    </div>
  </div>
);

export default Nav;
