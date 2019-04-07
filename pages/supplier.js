import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

const Supplier = props => {
  return (
    <div>
      <Head title="Supplier" />
      <Nav />

      <div className="page supplier">
        <img
          src="/static/images/product-cover.png"
          className="supplier__cover"
          alt="Supplier Title"
        />
        <div className="container">
          <div className="columns">
            <div className="column">
              <img
                src="https://picsum.photos/120/120/?image=1"
                alt="Brand Image"
              />
              <h1>Nestle Corporate</h1>
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
            <div className="column">
              <div className="supplier__products">
                <h2>Product Listing</h2>

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
};

export default Supplier;
