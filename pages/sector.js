import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Sector extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <div>
        <Head title="Search" />
        <Nav />

        <div className="page sector">
          <div className="container">
            <h1>Sector Title</h1>
          </div>

          {[...Array(3)].map((item, index) => (
            <div className="sector__supplier">
              <div className="container">
                <a href="/supplier">
                  <h2>
                    <i className="fas fa-store" />
                    Supplier Title {index + 1}
                  </h2>
                </a>

                <div className="sector__products">
                  <div className="columns">
                    {[...Array(6)].map((item, index) => (
                      <div className="column is-2">
                        <a href="/product">
                          <div className="card">
                            <div className="card-image">
                              <figure className="image is-4by3">
                                <img
                                  src="https://bulma.io/images/placeholders/1280x960.png"
                                  alt="Placeholder image"
                                />
                              </figure>
                            </div>
                            <div className="card-content">
                              <h3>Product Title {index + 1}</h3>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <nav className="pagination" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
              <li>
                <a
                  className="pagination-link"
                  aria-label="Goto previous page"
                  disabled
                >
                  <i className="fas fa-chevron-left" />
                </a>
              </li>
              <li>
                <a
                  className="pagination-link is-current"
                  aria-label="Page 1"
                  aria-current="page"
                >
                  1
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 2">
                  2
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 3">
                  3
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 4">
                  4
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 5">
                  5
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 6">
                  6
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 7">
                  7
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto page 8">
                  8
                </a>
              </li>
              <li>
                <a className="pagination-link" aria-label="Goto next page">
                  <i className="fas fa-chevron-right" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Sector;
