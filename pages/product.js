import React, { Component } from "react";
import moment from "moment";

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
          <div className="container">
            <ul className="product__commands">
              <li>
                <a href="">
                  <i className="fas fa-shopping-cart" />
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fas fa-share-alt" />
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fas fa-thumbs-up" />
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fas fa-rss" />
                </a>
              </li>
            </ul>
            <img
              src={
                product.webPictures && product.webPictures.length > 0
                  ? process.env.API_URL +
                    "/api/shop/general/v1/file/" +
                    product.webPictures[0].id
                  : "/static/images/top-bg.jpg"
              }
              className="product__cover"
              alt={product.name}
            />
            <div className="columns product__container">
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

              <div className="column is-5-desktop is-hidden-touch">
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
                {product.coupons.map(coupon => (
                  <div className="product__coupon">
                    <div className="coupon__image">
                      {cover && cover.id && (
                        <img
                          src={
                            process.env.API_URL +
                            "/api/shop/general/v1/file/" +
                            cover.id
                          }
                          alt={coupon.name}
                        />
                      )}

                      <span>
                        <i className="far fa-clock" />
                        &nbsp;{moment(coupon.expireDate * 1000).format("ll")}
                      </span>
                    </div>
                    <div className="coupon__content">
                      <h2>{coupon.name}</h2>
                      <p>{coupon.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
