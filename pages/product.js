import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

class Product extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <div>
        <Head title="Product" />
        <Nav />

        <div className="page product">
          <img
            src="/static/images/product-cover.png"
            className="product__cover"
            alt="Product Title"
          />
          <div className="container">
            <div className="columns">
              <div className="column product__info">
                <ul className="product__topcertified">
                  <li>
                    <a>
                      <img
                        src="/static/images/halal2-logo.png"
                        alt="Halal 2 Logo"
                      />
                    </a>
                  </li>
                  <li>
                    <a>
                      <img
                        src="/static/images/halal-logo.png"
                        alt="Halal Logo"
                      />
                    </a>
                  </li>
                </ul>
                <img
                  src="https://picsum.photos/120/120/?image=1"
                  alt="Brand Image"
                />
                <h1>Product Name</h1>

                <div className="product__description">
                  <div className="tabs">
                    <ul>
                      <li className="is-active">
                        <a href="#">Distribution Details</a>
                      </li>
                      <li>
                        <a href="#">Description</a>
                      </li>
                      <li>
                        <a href="#">Ingredient</a>
                      </li>
                    </ul>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro, eaque aut doloremque ipsam a impedit, omnis sit hic
                    fugit, rem exercitationem ex in eum maiores. Similique
                    mollitia iure totam debitis. Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Quisquam quis ea deserunt ut
                    dolores labore in. Et itaque enim est. Placeat perferendis
                    sed tempore cumque. Illum nobis in iusto officia. Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit. At
                    dignissimos veniam cupiditate ea atque, incidunt
                    perspiciatis ut minus illo perferendis reprehenderit
                    exercitationem modi impedit rerum doloribus. Aliquam nulla
                    quasi iste. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. A placeat nesciunt cum maxime obcaecati,
                    aut nostrum tempore quisquam necessitatibus praesentium quod
                    quidem vel atque dolorum quae possimus animi exercitationem
                    rem!
                  </p>
                </div>
              </div>

              <div className="column">
                <ul className="product__images">
                  <li>
                    <a href="#">
                      <img
                        src="https://picsum.photos/120/120/?image=1"
                        alt="Product Image 2"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://picsum.photos/120/120/?image=2"
                        alt="Product Image 3"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://picsum.photos/120/120/?image=3"
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
