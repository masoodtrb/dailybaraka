import React, { Component } from "react";
import Link from "next/link";
import * as supplierService from "../services/supplier";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class Supplier extends Component {
  static async getInitialProps({ query }) {
    return {
      supplier: await supplierService.getProducts(query.id)
    };
  }

  state = {
    products: []
  };

  render() {
    const { supplier } = this.props;
    return (
      <div>
        <Head title={supplier.name} />
        <Nav />

        <div className="page supplier">
          <img
            src={
              supplier.cover && supplier.cover.id
                ? process.env.API_URL +
                  "/api/shop/general/v1/file/" +
                  supplier.cover.id
                : "/static/images/top-bg.jpg"
            }
            className="supplier__cover"
            alt={supplier.name}
          />
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-6 is-12-touch">
                <img
                  className="supplier__logo"
                  src={
                    supplier.logo
                      ? process.env.API_URL +
                        "/api/shop/general/v1/file/" +
                        supplier.logo.id
                      : "/static/images/128x128.png"
                  }
                  alt={supplier.name}
                />
                <h1>{supplier.name}</h1>
                <p>{supplier.description}</p>
              </div>
              <div className="column is-6 is-12-touch">
                <div className="supplier__products">
                  <h2>{supplier.name} Products</h2>
                  {!supplier.categories || supplier.categories.length === 0 ? (
                    <div>No products available yet!</div>
                  ) : (
                    supplier.categories.map(category => (
                      <React.Fragment key={"category-" + category.id}>
                        <h3>{category.name}</h3>

                        {category.products && category.products.length > 0 && (
                          <ul>
                            {category.products.map(product => (
                              <li key={"product-" + product.id}>
                                <Link
                                  href={"/product?slug=" + item.slug}
                                  as={"/product/" + item.slug}
                                >
                                  <a>
                                    {product.brand && product.brand.name}{" "}
                                    {product.name}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Supplier;
