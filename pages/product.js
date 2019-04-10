import React, { Component } from "react";
import * as productService from "../services/product";

import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Product extends Component {
  static async getInitialProps({ query }) {
    return {
      product: await productService.get(query.id)
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
            src="/static/images/product-cover.png"
            className="product__cover"
            alt={product.name}
          />
          <div className="container">
            <div className="columns">
              <div className="column product__info">
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
                <img
                  className="product__brand-image"
                  src={
                    product.brand && product.logo
                      ? process.env.API_URL +
                        "api/shop/general/v1/file/" +
                        product.logo.id
                      : product.supplier && product.supplier.logo
                      ? process.env.API_URL +
                        "api/shop/general/v1/file/" +
                        product.supplier.logo.id
                      : "/static/images/128x128.png"
                  }
                  alt={product.brand.name}
                />
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
                  </div>
                </div>
              </div>

              <div className="column">
                <ul className="product__related">
                  <li>
                    <a href="#">
                      <img
                        src="/static/images/128x128.png"
                        alt="Product Image 2"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/static/images/128x128.png"
                        alt="Product Image 3"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/static/images/128x128.png"
                        alt="Product Image 4"
                      />
                    </a>
                  </li>
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
