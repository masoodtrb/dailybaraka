import React, { Component } from "react";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class UserFeeds extends Component {
  render() {
    return (
      <div>
        <Head title="My Feeds" />
        <Nav />
        <div className="page feeds">
          <div className="container">
            <h1>My Feeds</h1>
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
                        <p class="title is-4">Maria Snow</p>
                        <p class="subtitle is-6">@mariasnw</p>
                      </div>
                    </div>

                    <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris.
                      <hr />
                      <p>
                        <label>Families and Friends in network</label>
                        <span>52</span>
                      </p>
                      <p>
                        <label>My favorite products</label>
                        <span>146</span>
                      </p>
                      <p>
                        <label>My saved articles</label>
                        <span>3</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-5">
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
                            <p class="title is-5">Boots Chemist</p>
                            <p class="subtitle is-6">662 Followers</p>
                          </div>
                        </div>

                        <div class="content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec iaculis mauris.
                        </div>
                        <div className="content">
                          <img
                            src="http://lorempixel.com/800/500/food/"
                            alt="Placeholder image"
                          />
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
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <div className="feeds__categories">
                  {[...Array(6)].map((item, index) => (
                    <a href="#">
                      <img
                        src={
                          "http://lorempixel.com/400/400/sports/" +
                          (index + 1) +
                          "/"
                        }
                        alt="Placeholder image"
                      />
                      <span>
                        {index === 0
                          ? "Lifestyle"
                          : index === 1
                          ? "Holiday"
                          : index === 2
                          ? "Foods"
                          : index === 3
                          ? "Charity"
                          : index === 4
                          ? "Finance"
                          : index === 5
                          ? "Health"
                          : ""}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserFeeds;
