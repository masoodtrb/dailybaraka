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
                <div className="card feeds__profile">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="http://lorempixel.com/270/200/people/"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">Maria Snow</p>
                        <p className="subtitle is-6">@mariasnw</p>
                      </div>
                    </div>

                    <div className="content">
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
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img
                            src="http://lorempixel.com/96/96/people/2"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">Nima Bani</p>
                        <p className="subtitle is-6">
                          Director - Prima Cheese - 15h ago
                        </p>
                      </div>
                    </div>

                    <div className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris.&nbsp;
                      <a href="#">#css</a> <a href="#">#responsive</a>
                    </div>

                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-48x48">
                              <img
                                src="http://lorempixel.com/96/96/technics/3"
                                alt="Placeholder image"
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-5">Boots Chemist</p>
                            <p className="subtitle is-6">662 Followers</p>
                          </div>
                        </div>

                        <div className="content">
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
                    </div>
                  </div>

                  <footer className="card-footer">
                    <a href="#" className="card-footer-item">
                      <i className="far fa-thumbs-up" />
                      &nbsp;Like
                    </a>
                    <a href="#" className="card-footer-item">
                      <i className="far fa-comment-dots" />
                      &nbsp;Comment
                    </a>
                    <a href="#" className="card-footer-item">
                      <i className="far fa-share-square" />
                      &nbsp;Share
                    </a>
                  </footer>
                </div>
                <br />
                {[...Array(6)].map(() => (
                  <React.Fragment>
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-48x48">
                              <img
                                src="http://lorempixel.com/96/96/people/2"
                                alt="Placeholder image"
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-4">Nima Bani</p>
                            <p className="subtitle is-6">
                              Director - Prima Cheese - 15h ago
                            </p>
                          </div>
                        </div>

                        <div className="content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec iaculis mauris.&nbsp;
                          <a href="#">#css</a> <a href="#">#responsive</a>
                        </div>
                      </div>

                      <footer className="card-footer">
                        <a href="#" className="card-footer-item">
                          <i className="far fa-thumbs-up" />
                          &nbsp;Like
                        </a>
                        <a href="#" className="card-footer-item">
                          <i className="far fa-comment-dots" />
                          &nbsp;Comment
                        </a>
                        <a href="#" className="card-footer-item">
                          <i className="far fa-share-square" />
                          &nbsp;Share
                        </a>
                      </footer>
                    </div>
                    <br />
                  </React.Fragment>
                ))}
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
