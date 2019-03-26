import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

const Search = props => {
  return (
    <div>
      <Head title="Search" />
      <Nav />

      <div className="page supplier">
        <div className="container">
          <div className="columns">
            <div className="column is-2">
              <img
                className="supplier__logo"
                src="/static/images/supplier-avatar.png"
                alt="Supplier Logo"
              />
            </div>
            <div className="column supplier__info">
              <h1>Supplier Name</h1>
              <span className="supplier__contact">
                <i className="fas fa-phone" />
                Tel:
                <a href="tel: +4497658754">+4497658754</a>
              </span>
              <span className="supplier__contact">
                <i className="fas fa-map-marker-alt" />
                Address:
                <a href="https://map.google.com/">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </a>
              </span>

              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                corporis delectus qui error molestias cupiditate voluptate,
                laudantium alias ratione ex, aut repellat nostrum cum quibusdam
                enim soluta ipsa labore explicabo. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Fugiat doloribus, quos enim
                eveniet cupiditate voluptatibus accusamus id accusantium, ipsam
                non officia ea quasi asperiores adipisci eligendi et eum
                consequuntur suscipit? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Molestias qui ex a tenetur quae expedita error
                quas minima, iste ipsum aspernatur libero, recusandae voluptas
                debitis, aliquid itaque sapiente magnam suscipit.
              </p>
            </div>
          </div>

          <div className="supplier__products">
            <h2>
              <i className="fas fa-heart" />
              Products
            </h2>

            <div className="columns is-multiline">
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="column is-2">
                <a>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3>Product Title</h3>
                      <div className="content">Store Name</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
