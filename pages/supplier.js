import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";
import * as supplierService from "../services/supplier";

class Supplier extends Component {
  static async getInitialProps({ query }) {
    return {
      supplier: await supplierService.get(query.id)
    };
  }

  state = {
    products: []
  };

  componentDidMount() {}

  render() {
    const { supplier } = this.props;
    console.log(this.props);
    return (
      <div>
        <Head title={supplier.name} />
        <Nav />

        <div className="page supplier">
          <img
            src={
              supplier.cover && supplier.cover.id
                ? process.env.API_URL +
                  "api/shop/general/v1/file/" +
                  supplier.cover.id
                : "/static/images/supplier-bg.png"
            }
            className="supplier__cover"
            alt={supplier.name}
          />
          <div className="container">
            <div className="columns">
              <div className="column">
                <img
                  className="supplier__logo"
                  src={
                    supplier.logo
                      ? process.env.API_URL +
                        "api/shop/general/v1/file/" +
                        supplier.logo.id
                      : "/static/images/128x128.png"
                  }
                  alt={supplier.name}
                />
                <h1>{supplier.name}</h1>
                <p>{supplier.description}</p>
              </div>
              <div className="column">
                <div className="supplier__products">
                  <h2>{supplier.name} Products</h2>

                  <h3>Beverages</h3>
                  <ul>
                    <li>
                      <a>Coffeemate Original/light</a>
                    </li>
                    <li>
                      <a>Coffeemate Original/light</a>
                    </li>
                    <li>
                      <a>Coffeemate Original/light</a>
                    </li>
                    <li>
                      <a>Coffeemate Original/light</a>
                    </li>
                    <li>
                      <a>Coffeemate Original/light</a>
                    </li>
                  </ul>
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
