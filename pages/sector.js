import React, { Component } from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import * as sectorService from "../services/sector";

import Head from "../components/head";
import Nav from "../components/nav";
import withIntl from "../hoc/withIntl";

import "../styles/main.scss";

class Sector extends Component {
  static async getInitialProps({ query }) {
    return {
      sector: await sectorService.get(query.lang, query.id),
      suppliers: await sectorService.getSuppliersAndProducts(
        query.lang,
        query.id
      )
    };
  }

  render() {
    const { sector, suppliers } = this.props;
    return (
      <div>
        <Head title={sector.name} />
        <Nav />

        <div className="page sector">
          <div className="container">
            <h1>{sector.name}</h1>
          </div>

          {suppliers &&
            suppliers.result &&
            suppliers.result.map(supplier => (
              <div key={"supplier-" + supplier.id} className="sector__supplier">
                <div className="container">
                  <Link
                    href={`/supplier/?id=${supplier.id}&name=${
                      supplier.name
                    }&lang=${this.props.intl.locale}`}
                    as={`/${this.props.intl.locale}/supplier/${supplier.id}/${
                      supplier.name
                    }`}
                  >
                    <a>
                      <h2>
                        <i className="fas fa-store" />
                        {supplier.name}
                      </h2>
                    </a>
                  </Link>
                  <Link
                    href={`/supplier/?id=${supplier.id}&name=${
                      supplier.name
                    }&lang=${this.props.intl.locale}`}
                    as={`/${this.props.intl.locale}/supplier/${supplier.id}/${
                      supplier.name
                    }`}
                  >
                    <a className="sector__more">
                      <FormattedMessage
                        id="sector.supplier.link"
                        defaultMessage="More..."
                      />
                    </a>
                  </Link>
                  <div className="sector__products">
                    <div className="columns is-multiline">
                      {supplier.products.map(
                        (product, index) =>
                          index < 6 && (
                            <div
                              key={"product-" + product.id}
                              className="column is-2"
                            >
                              <Link
                                href={`/product?slug=${product.slug}&lang=${
                                  this.props.intl.locale
                                }`}
                                as={`/${this.props.intl.locale}/product/${
                                  product.slug
                                }`}
                              >
                                <a>
                                  <div className="card">
                                    <div className="card-image">
                                      <figure className="image is-4by3">
                                        <img
                                          src={
                                            product.mainPicture
                                              ? process.env.API_URL +
                                                "/api/shop/general/v1/file/" +
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
                              </Link>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {suppliers && suppliers.pagination && suppliers.pagination.page > 1 && (
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

export default withIntl(Sector);
