import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

const Home = props => {
  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="page home">
        <div className="container">
          <img
            className="home__logo"
            src="/static/images/logo-big.png"
            alt="daily baraka logo"
          />

          <div className="home__search">
            <div className="field has-addons">
              <p className="control">
                <span className="select">
                  <select>
                    <option selected>All</option>
                    <option>Sector 1</option>
                    <option>Sector 2</option>
                  </select>
                </span>
              </p>
              <p className="control search-input">
                <input className="input" type="search" placeholder="Search" />
              </p>
              <p className="control">
                <button type="submit" className="button">
                  <i className="fas fa-search" />
                </button>
              </p>
            </div>
          </div>

          <div className="home__sectors">
            <ul>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 1</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 2</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 3</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 4</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 5</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 6</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 7</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 8</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 9</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 10</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 11</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 12</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 13</span>
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/static/images/sector-sm.png" alt="" />
                  <span>sector 14</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
