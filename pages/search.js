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
  static async getInitialProps({ query }) {
    return {
      products: await productService.search(
        query.sector === "all" ? null : query.sector,
        query.q
      ),
      searchValue: query.q
    };
  }

  render() {
    const { products, searchValue } = this.props;
    return (
      <div>
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav />

        <div className="page sectors">
          <div className="container">
            <h1>
              <FormattedMessage
                id="search.title"
                values={{ searchValue }}
                defaultMessage="Search result for '{searchValue}'"
              />
            </h1>

            <div className="columns is-multiline">
              {products.result &&
              products.result &&
              products.result.length > 0 ? (
                products.result.map(product => (
                  <div
                    key={"search-product" + product.id}
                    className="column is-4"
                  >
                    <Link
                      href={`/product?slug=${product.slug}`}
                      as={`/${this.props.locale}/product/${product.slug}`}
                    >
                      <a>
                        <div className="box">
                          <article className="media">
                            <div className="media-left">
                              <figure className="image">
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
                            <div className="media-content">
                              <div className="content">
                                <p>
                                  <strong>{product.name}</strong>
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="notification is-info">
                  <FormattedMessage
                    id="search.empty"
                    defaultMessage="No result is found!"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withIntl(Search);
