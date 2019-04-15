import React, { Component } from "react";
import * as productService from "../services/product";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class Search extends Component {
  static async getInitialProps({ query }) {
    console.log("query");
    console.log(query);
    return {
      products: await productService.search(query.sector, query.q),
      searchValue: query.q
    };
  }

  render() {
    const { products, searchValue } = this.props;
    return (
      <div>
        <Head title="Search" />
        <Nav />

        <div className="page sectors">
          <div className="container">
            <h1>Search result for "{searchValue}"</h1>

            <div className="columns is-multiline">
              {products.result.map((item, index) => (
                <div className="column is-4">
                  <Link href={"/product/" + product.id + "/" + product.name}>
                    <a href="/sector">
                      <div className="box">
                        <article className="media">
                          <div className="media-left">
                            <figure className="image">
                              <img
                                src={
                                  item.mainPicture
                                    ? process.env.API_URL +
                                      "api/shop/general/v1/file/" +
                                      item.mainPicture.id
                                    : "/static/images/128x128.png"
                                }
                                alt={item.name}
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{item.name}</strong>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
