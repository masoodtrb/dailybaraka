import React, { Component } from "react";
import Link from "next/link";
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
              {this.props.sectors.result &&
                this.props.sectors.result.map(sector => (
                  <div key={"sector-" + sector.id} className="column is-4">
                    <Link
                      href={"/sector?id=" + sector.id + "&name=" + sector.name}
                      as={"/sector/" + sector.id + "/" + sector.name}
                    >
                      <a>
                        <div className="box">
                          <article className="media">
                            <div className="media-left">
                              <figure className="image">
                                <img
                                  src={
                                    sector.picture
                                      ? process.env.API_URL +
                                        "/api/shop/general/v1/file/" +
                                        sector.picture.id
                                      : "/static/images/128x128.png"
                                  }
                                  alt={sector.name}
                                />
                              </figure>
                            </div>
                            <div className="media-content">
                              <div className="content">
                                <p>
                                  <strong>{sector.name}</strong>
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                      </a>
                    </Link>
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
