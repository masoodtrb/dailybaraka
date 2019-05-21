import React, { Component } from "react";
import * as productService from "../services/product";

import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";
import { FormattedMessage } from "react-intl";

class Product extends Component {
  static async getInitialProps({ query }) {
    return {
      product: await productService.getBySlug(query.lang, query.slug)
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
    return (
      <div>
        <Head title={product.name} />
        <Nav />

        <div className="page product">
          <img
            src={
              product.cover && product.cover.id
                ? process.env.API_URL +
                  "/api/shop/general/v1/file/" +
                  product.cover.id
                : "/static/images/top-bg.jpg"
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
                        <li key={"certificate-" + certificate.id}>
                          <a
                            href={certificate.link}
                            target="_blank"
                            rel="noopener nofollow"
                          >
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
                          "/api/shop/general/v1/file/" +
                          product.brand.logo.id
                        : product.supplier && product.supplier.logo
                        ? process.env.API_URL +
                          "/api/shop/general/v1/file/" +
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
                          <FormattedMessage
                            id="product.description"
                            defaultMessage="Product"
                          />
                        </a>
                      </li>
                      <li className={tab === "ingredient" ? "is-active" : ""}>
                        <a
                          href="#"
                          onClick={e => this.onChangeTab(e, "ingredient")}
                        >
                          <FormattedMessage
                            id="product.ingredient"
                            defaultMessage="Ingredient"
                          />
                        </a>
                      </li>
                      <li className={tab === "certificates" ? "is-active" : ""}>
                        <a
                          href="#"
                          onClick={e => this.onChangeTab(e, "certificates")}
                        >
                          <FormattedMessage
                            id="product.certifiers"
                            defaultMessage="Certifiers"
                          />
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
                          <li key={"certificate-" + certificate.id}>
                            <a
                              href={certificate.link}
                              target="_blank"
                              rel="noopener nofollow"
                            >
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
                {product.relatedProducts && (
                  <ul className="product__related">
                    {product.relatedProducts.map(relatedProduct => (
                      <li key={"relatedProduct-" + relatedProduct.id}>
                        <a
                          href={"/product?slug=" + relatedProduct.slug}
                          as={"/product/" + relatedProduct.slug}
                        >
                          <img
                            src={
                              relatedProduct.mainPicture &&
                              relatedProduct.mainPicture.id
                                ? process.env.API_URL +
                                  "/api/shop/general/v1/file/" +
                                  relatedProduct.mainPicture.id
                                : "/static/images/128x128.png"
                            }
                            alt={relatedProduct.name}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
