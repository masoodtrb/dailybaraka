import React, { Component } from "react"
import Head from "../components/head"
import Nav from "../components/nav"
import "../styles/main.scss"

class Product extends Component {
  static async getInitialProps ({ query }) {
    return {query}
  }

  render() {
    return (
      <div>
        <Head title="Product" />
        <Nav />
        <div className="hero">
          <h1 className="title">Welcome to Product page!</h1>
          <p className="description">
            To get started, edit <code>pages/product.js</code> and save to
            reload.
          </p>
        </div>
      </div>
    )
  }
}

export default Product
