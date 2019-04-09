import React, { Component } from "react";
import * as sectorService from "../services/sector";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class Sector extends Component {
  static async getInitialProps({ query }) {
    return {
      sector: await sectorService.getSuppliersAndProducts(query.id)
    };
  }

  render() {
    return (
      <div>
        <Head title="Sector" />
        <Nav />

        <div className="page sector">
          <div className="container">
            <h1>Sector Title</h1>
          </div>

          {this.props.sector.result.map((supplier, index) => (
            <div key={"supplier-" + supplier.id} className="sector__supplier">
              <div className="container">
                <a href={"/supplier/" + supplier.id + "-" + supplier.name}>
                  <h2>
                    <i className="fas fa-store" />
                    {supplier.name}
                  </h2>
                </a>

                <div className="sector__products">
                  <div className="columns">
                    {supplier.products.map((product, index) => (
                      <div
                        key={"product-" + product.id}
                        className="column is-2"
                      >
                        <a href={"/product/" + product.id + "-" + product.name}>
                          <div className="card">
                            <div className="card-image">
                              <figure className="image is-4by3">
                                <img
                                  src={
                                    product.mainPicture
                                      ? process.env.API_URL +
                                        "api/shop/general/v1/file/" +
                                        product.mainPicture.id
                                      : "/static/images/128x128.png"
                                  }
                                  alt={product.name}
                                />
                              </figure>
                            </div>
                            <div className="card-content">
                              <h3>{product.name}</h3>
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

          {this.props.sector.pagination.page > 1 && (
            <nav
              className="pagination"
              role="navigation"
              aria-label="pagination"
            >
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
                {[...Array(this.props.sector.pagination.page)].map(
                  (item, index) => (
                    <li key={"page-" + (index + 1)}>
                      <a
                        className="pagination-link"
                        aria-label={"Goto page " + (index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
                )}
                <li>
                  <a className="pagination-link" aria-label="Goto next page">
                    <i className="fas fa-chevron-right" />
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    );
  }
}

export default Sector;
