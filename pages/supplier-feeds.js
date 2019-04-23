import React, { Component } from "react";

import Line from "react-chartjs";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class SupplierFeeds extends Component {
  render() {
    return (
      <div>
        <Head title="My Feeds" />
        <Nav />
        <div className="page feeds">
          <br />
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <div class="card feeds__profile">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img
                        src="http://lorempixel.com/270/200/people/"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">Boots Chemist</p>
                        <p class="subtitle is-6">@bootschemist</p>
                      </div>
                    </div>
                    <hr />
                    <div class="content">
                      <p>
                        <label>Products</label>
                        <span>52</span>
                      </p>
                      <p>
                        <label>Campaigns</label>
                        <span>146</span>
                      </p>
                      <p>
                        <label>Coupons</label>
                        <span>3</span>
                      </p>
                    </div>
                    <hr />
                    <div className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Phasellus nec iaculis mauris.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris.
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-5">
                <div class="card feeds__post">
                  <div class="feeds__postbody">
                    <i class="far fa-edit" />
                    &nbsp;Start a post
                  </div>
                  <div class="feeds__postvideo">
                    <i class="far fa-file-video" />
                  </div>
                  <div class="feeds__postimage">
                    <i class="far fa-file-image" />
                  </div>
                </div>
                <br />
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img
                            src="http://lorempixel.com/96/96/people/2"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">Nima Bani</p>
                        <p class="subtitle is-6">
                          Director - Prima Cheese - 15h ago
                        </p>
                      </div>
                    </div>

                    <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris.&nbsp;
                      <a href="#">#css</a> <a href="#">#responsive</a>
                    </div>

                    <div class="card">
                      <div class="card-content">
                        <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                              <img
                                src="http://lorempixel.com/96/96/technics/3"
                                alt="Placeholder image"
                              />
                            </figure>
                          </div>
                          <div class="media-content">
                            <h1 class="title is-5">Boots Chemist</h1>
                          </div>
                        </div>

                        <div class="content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec iaculis mauris lorem ipsum dolor
                          sit amet, consectetur adipiscing elit.
                        </div>
                        <div className="content">
                          <iframe
                            style={{ "min-height": 260 }}
                            width="800"
                            height="500"
                            src="https://www.youtube.com/embed/pOuSRUl-Pco"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <footer class="card-footer">
                    <a href="#" class="card-footer-item">
                      <i class="far fa-thumbs-up" />
                      &nbsp;Like
                    </a>
                    <a href="#" class="card-footer-item">
                      <i class="far fa-comment-dots" />
                      &nbsp;Comment
                    </a>
                    <a href="#" class="card-footer-item">
                      <i class="far fa-share-square" />
                      &nbsp;Share
                    </a>
                  </footer>
                </div>
                <br />
                {[...Array(6)].map(() => (
                  <React.Fragment>
                    <div class="card">
                      <div class="card-content">
                        <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                              <img
                                src="http://lorempixel.com/96/96/people/2"
                                alt="Placeholder image"
                              />
                            </figure>
                          </div>
                          <div class="media-content">
                            <p class="title is-4">Nima Bani</p>
                            <p class="subtitle is-6">
                              Director - Prima Cheese - 15h ago
                            </p>
                          </div>
                        </div>

                        <div class="content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec iaculis mauris.&nbsp;
                          <a href="#">#css</a> <a href="#">#responsive</a>
                        </div>
                      </div>

                      <footer class="card-footer">
                        <a href="#" class="card-footer-item">
                          <i class="far fa-thumbs-up" />
                          &nbsp;Like
                        </a>
                        <a href="#" class="card-footer-item">
                          <i class="far fa-comment-dots" />
                          &nbsp;Comment
                        </a>
                        <a href="#" class="card-footer-item">
                          <i class="far fa-share-square" />
                          &nbsp;Share
                        </a>
                      </footer>
                    </div>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="column is-4">
                <div className="feeds__insights">
                  <Line.LineChart
                    data={[10,20]}
                    options={}
                    width="600"
                    height="250"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SupplierFeeds;
