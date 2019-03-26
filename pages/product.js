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
          <div className="container">
            <img
              className="product__barcode"
              src="/static/images/barcode.png"
              alt="Product Barcode"
            />
            <div className="columns">
              <div className="column is-2">
                <a href="#">
                  <img
                    className="product__image"
                    src="https://picsum.photos/200/200"
                    alt="Product Image 1"
                  />
                </a>
                <ul className="product__images">
                  <li>
                    <a href="#">
                      <img
                        src="https://picsum.photos/60/60/?image=1"
                        alt="Product Image 2"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://picsum.photos/60/60/?image=2"
                        alt="Product Image 3"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://picsum.photos/60/60/?image=3"
                        alt="Product Image 4"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="column product__info">
                <h1>Product Name</h1>
                <h2>Product Sector</h2>
                <h3>Supplier</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  corporis delectus qui error molestias cupiditate voluptate,
                  laudantium alias ratione ex, aut repellat nostrum cum
                  quibusdam enim soluta ipsa labore explicabo. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Fugiat doloribus, quos
                  enim eveniet cupiditate voluptatibus accusamus id accusantium,
                  ipsam non officia ea quasi asperiores adipisci eligendi et eum
                  consequuntur suscipit? Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Molestias qui ex a tenetur quae expedita
                  error quas minima, iste ipsum aspernatur libero, recusandae
                  voluptas debitis, aliquid itaque sapiente magnam suscipit.
                </p>
                <p>
                  <img
                    src="/static/images/halal2-logo.png"
                    alt="Halal 2 Logo"
                  />
                  <img src="/static/images/halal-logo.png" alt="Halal Logo" />
                </p>
              </div>
            </div>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
                eaque aut doloremque ipsam a impedit, omnis sit hic fugit, rem
                exercitationem ex in eum maiores. Similique mollitia iure totam
                debitis. Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Quisquam quis ea deserunt ut dolores labore in. Et itaque
                enim est. Placeat perferendis sed tempore cumque. Illum nobis in
                iusto officia. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. At dignissimos veniam cupiditate ea atque,
                incidunt perspiciatis ut minus illo perferendis reprehenderit
                exercitationem modi impedit rerum doloribus. Aliquam nulla quasi
                iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                placeat nesciunt cum maxime obcaecati, aut nostrum tempore
                quisquam necessitatibus praesentium quod quidem vel atque
                dolorum quae possimus animi exercitationem rem!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
