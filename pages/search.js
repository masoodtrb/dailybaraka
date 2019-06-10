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

const getUrlParameter = field => {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(field);
};

class Search extends Component {
  static async getInitialProps({ query }) {
    return {
      lang: query.lang
    };
  }

  state = {
    products: null,
    searchValue: null
  };

  async componentDidMount() {
    const query = getUrlParameter("q");
    const sector = getUrlParameter("sector");

    this.setState({
      searchValue: query
    });

    this.setState({
      products: await productService.search(
        this.props.lang,
        sector === "all" ? null : sector,
        query
      )
    });
  }

  render() {
    const { products, searchValue } = this.state;
    const { locale } = this.props.intl;
    debugger;
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
            {!products ? (
              <div className="notification column is-12">
                <FormattedMessage
                  id="common.wait"
                  defaultMessage="Please wait..."
                />
              </div>
            ) : !products.result || products.result.length === 0 ? (
              <div className="notification column is-12">
                <FormattedMessage
                  id="search.empty"
                  defaultMessage="No result is found!"
                />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(Search);
