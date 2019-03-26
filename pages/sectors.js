import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

const Search = props => {
  return (
    <div>
      <Head title="Search" />
      <Nav />

      <div className="page sectors">
        <div className="container">
          <h1>Sectors</h1>

          <div className="columns is-multiline">
            {[...Array(9).keys()].map((item, index) => (
              <div className="column is-4">
                <a href="/sector">
                  <div className="box">
                    <article className="media">
                      <div className="media-left">
                        <figure className="image">
                          <img
                            src="https://bulma.io/images/placeholders/128x128.png"
                            alt="Image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>Sector {index + 1}</strong>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
