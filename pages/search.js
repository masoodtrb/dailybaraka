import React, { Component } from "react";
import Link from "next/link";
import { FormattedMessage, defineMessages } from "react-intl";

import withIntl from "../hoc/withIntl";

import * as productService from "../services/product";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

const messages = defineMessages({
  title: {
    id: "search.title",
    defaultMessage: "Search"
  }
});

class Search extends Component {
  static async getInitialProps({ req, query }) {
    return {
      products: await productService.search(
        query.lang,
        req.query.sector === "all" ? null : req.query.sector,
        req.query.q
      ),
      searchValue: query.q
    };
  }

  render() {
    const { products, searchValue } = this.props;
    const { locale } = this.props.intl;
    return (
      <div>
        <Head
          title={this.props.intl.formatMessage(messages.title, { searchValue })}
        />
        <Nav />

        <div className="page search">
          <div className="container">
            <h1>
              <FormattedMessage
                id="search.title"
                values={{ searchValue }}
                defaultMessage="Search result for '{searchValue}'"
              />
            </h1>
            <hr />
            {products.result && products.result.length > 0 ? (
              products.result.map(product => (
                <div
                  key={"search-product" + product.id}
                  className="search__product"
                >
                  <div className="product__content">
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
                    <div>
                      <Link
                        href={`/product?slug=${product.slug}&lang=${locale}`}
                        as={`/${locale}/product/${product.slug}`}
                      >
                        <a>
                          <h3>{product.name}</h3>
                        </a>
                      </Link>
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div className="product__shortcut">
                    <span className="shortcut__supplier">
                      <FormattedMessage
                        id="search.product.more-link"
                        defaultMessage="More products from"
                      />
                      &nbsp;
                      <Link
                        href={`/supplier/?id=${product.supplier.id}&name=${
                          product.supplier.name
                        }&lang=${locale}`}
                        as={`/${locale}/supplier/${product.supplier.id}/${
                          product.supplier.name
                        }`}
                      >
                        <a>{product.supplier.name}</a>
                      </Link>
                    </span>
                    <Link
                      href={`/supplier/?id=${product.supplier.id}&name=${
                        product.supplier.name
                      }&lang=${locale}`}
                      as={`/${locale}/supplier/${product.supplier.id}/${
                        product.supplier.name
                      }`}
                    >
                      <a className="shortcut__organization">
                        <FormattedMessage
                          id="search.product.supplier-link"
                          defaultMessage="View accreditation organization"
                        />
                      </a>
                    </Link>
                    <a href="#" className="shortcut__button">
                      <i className="fas fa-plus-circle" />
                      &nbsp;
                      <FormattedMessage
                        id="search.product.add-to-cart"
                        defaultMessage="Add to shopping list"
                      />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="notification column is-12">
                <FormattedMessage
                  id="search.empty"
                  defaultMessage="No result is found!"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(Search);
