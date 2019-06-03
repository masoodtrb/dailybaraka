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
                        src="/static/images/feeds/zarah-profile.jpg"
                        alt="Profile"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">Zarah Khan</p>
                        <p className="subtitle is-6">@zarahkhn</p>
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
                            src="/static/images/feeds/nima.jpg"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">Nima Bani</p>
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
                                src="/static/images/feeds/elephant-logo.jpg"
                                alt="Placeholder image"
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <p className="title is-5">
                              Elephant Atta: Come home
                            </p>
                            <p className="subtitle is-6">662 Followers</p>
                          </div>
                        </div>

                        <div className="content">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec iaculis mauris.
                        </div>
                        <div className="content">
                          <img src="/static/images/feeds/elephant-video.jpg" />
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
              </div>
              <div className="column is-4">
                <div className="feeds__categories">
                  <a href="#">
                    <img
                      src={"/static/images/feeds/lifestyle.jpg"}
                      alt="Lifestyle"
                    />
                    <span>Lifestyle</span>
                  </a>
                  <a href="#">
                    <img
                      src={"/static/images/feeds/holiday.jpg"}
                      alt="Holiday"
                    />
                    <span>Holiday</span>
                  </a>
                  <a href="#">
                    <img src={"/static/images/feeds/food.jpg"} alt="Food" />
                    <span>Food</span>
                  </a>
                  <a href="#">
                    <img
                      src={"/static/images/feeds/charity.jpg"}
                      alt="Charity"
                    />
                    <span>Charity</span>
                  </a>
                  <a href="#">
                    <img
                      src={"/static/images/feeds/finance.jpg"}
                      alt="Finance"
                    />
                    <span>Finance</span>
                  </a>
                  <a href="#">
                    <img src={"/static/images/feeds/health.jpg"} alt="Health" />
                    <span>Health</span>
                  </a>
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
