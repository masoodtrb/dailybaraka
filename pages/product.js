import React, { Component } from "react";
import * as productService from "../services/product";

import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Product extends Component {
  static async getInitialProps({ query }) {
    return {
      product: await productService.getBySlug(query.id)
    };
  }

  state = {
    tab: "product"
  };

  onChangeTab = (event, tabState) => {
    event.preventDefault();
    this.setState({ tab: tabState });
  };

  render() {
    const { product } = this.props;
    const { tab } = this.state;
    console.log(this.props);
    return (
      <div>
        <Head title={product.name} />
        <Nav />

        <div className="page product">
          <img
            src={
              product.cover && product.cover.id
                ? process.env.API_URL +
                  "api/shop/general/v1/file/" +
                  product.cover.id
                : "/static/images/supplier-bg.png"
            }
            className="product__cover"
            alt={product.name}
          />
          <div className="container">
            <div className="columns">
              <div className="column product__info">
                {product.halalCertificates &&
                  product.halalCertificates.length > 0 && (
                    <ul className="product__topcertified">
                      {product.halalCertificates.map(certificate => (
                        <li>
                          <a>
                            <img
                              src="/static/images/halal2-logo.png"
                              alt={certificate.name}
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                {product.brand && (
                  <img
                    className="product__brand-image"
                    src={
                      product.brand && product.brand.logo
                        ? process.env.API_URL +
                          "api/shop/general/v1/file/" +
                          product.brand.logo.id
                        : product.supplier && product.supplier.logo
                        ? process.env.API_URL +
                          "api/shop/general/v1/file/" +
                          product.supplier.logo.id
                        : "/static/images/128x128.png"
                    }
                    alt={product.brand.name}
                  />
                )}

                <h1>{product.name}</h1>

                <div className="product__description">
                  <div className="tabs">
                    <ul>
                      <li className={tab === "product" ? "is-active" : ""}>
                        <a
                          href="#"
                          onClick={e => this.onChangeTab(e, "product")}
                        >
                          Product
                        </a>
                      </li>
                      <li className={tab === "ingredient" ? "is-active" : ""}>
                        <a
                          href="#"
                          onClick={e => this.onChangeTab(e, "ingredient")}
                        >
                          Ingredient
                        </a>
                      </li>
                      <li className={tab === "certificates" ? "is-active" : ""}>
                        <a
                          href="#"
                          onClick={e => this.onChangeTab(e, "certificates")}
                        >
                          Certificates
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={[
                      "tab-content",
                      tab === "product" ? "active" : null
                    ].join(" ")}
                  >
                    <p>{product.description}</p>
                  </div>
                  <div
                    className={[
                      "tab-content",
                      tab === "ingredient" ? "active" : null
                    ].join(" ")}
                  >
                    <p>{product.ingredient}</p>
                  </div>
                  <div
                    className={[
                      "tab-content",
                      tab === "certificates" ? "active" : null
                    ].join(" ")}
                  >
                    <ul>
                      {product.halalCertificates &&
                        product.halalCertificates.length > 0 &&
                        product.halalCertificates.map(certificate => (
                          <li>
                            <a>
                              <img
                                src="/static/images/halal2-logo.png"
                                alt={certificate.name}
                              />
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="column is-hidden-touch">
                <ul className="product__related">
                  {product.relatedProducts.map(item => (
                    <li>
                      <a href={"/product/" + item.slug}>
                        <img
                          src={
                            item.mainPicture && product.mainPicture.id
                              ? process.env.API_URL +
                                "api/shop/general/v1/file/" +
                                product.mainPicture.id
                              : "/static/images/128x128.png"
                          }
                          alt={item.name}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
