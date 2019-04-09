import React, { Component } from "react";

import * as sectorService from "../services/sector";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class Sectors extends Component {
  static async getInitialProps({ req }) {
    return { sectors: await sectorService.getAll() };
  }

  render() {
    return (
      <div>
        <Head title="Sectors" />
        <Nav />

        <div className="page sectors">
          <div className="container">
            <h1>Sectors</h1>

            <div className="columns is-multiline">
              {this.props.sectors.result.map((item, index) => (
                <div key={item.id} className="column is-4">
                  <a href={"/sector/" + item.id + "-" + item.name}>
                    <div className="box">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image">
                            <img
                              src="https://bulma.io/images/placeholders/128x128.png"
                              alt={item.name}
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>{item.name}</strong>
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
  }
}

export default Sectors;
