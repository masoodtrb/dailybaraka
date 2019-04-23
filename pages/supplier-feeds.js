import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Daily post likes",
      backgroundColor: "#fff",
      borderColor: "#111",
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
};

const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Daily post likes",
      backgroundColor: "transparent",
      borderColor: "#111",
      data: [11, 4, 16, 12, 25, 22, 26]
    }
  ]
};

const cardChartData4 = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ],
  datasets: [
    {
      label: "Daily post likes",
      backgroundColor: "#111",
      data: [
        11,
        12,
        16,
        12,
        25,
        22,
        26,
        11,
        6,
        16,
        12,
        25,
        22,
        26,
        11,
        15,
        16,
        12,
        25,
        22,
        26
      ]
    }
  ]
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 2
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

class SupplierFeeds extends Component {
  render() {
    return (
      <div>
        <Head title="Boots Chemist Feeds" />
        <Nav />
        <div className="page feeds">
          <br />
          <div className="container">
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
                        <p className="title is-4">Boots Chemist</p>
                        <p className="subtitle is-6">@bootschemist</p>
                      </div>
                    </div>
                    <hr />
                    <div className="content">
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
                <div className="card feeds__post">
                  <div className="feeds__postbody">
                    <i className="far fa-edit" />
                    &nbsp;Start a post
                  </div>
                  <div className="feeds__postvideo">
                    <i className="far fa-file-video" />
                  </div>
                  <div className="feeds__postimage">
                    <i className="far fa-file-image" />
                  </div>
                </div>
                <br />
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
                            <h1 className="title is-5">Boots Chemist</h1>
                          </div>
                        </div>

                        <div className="content">
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
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
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
                <div className="feeds__insights">
                  <div>
                    <h2>2.563</h2>
                    <h3>Post likes</h3>
                    <Line
                      data={cardChartData2}
                      options={cardChartOpts2}
                      height={70}
                    />
                  </div>

                  <div>
                    <h2>108</h2>
                    <h3>Post likes</h3>
                    <Line
                      data={cardChartData3}
                      options={cardChartOpts2}
                      height={70}
                    />
                  </div>

                  <div>
                    <h2>305</h2>
                    <h3>Coupon Usage</h3>
                    <Bar
                      data={cardChartData4}
                      options={cardChartOpts2}
                      height={70}
                    />
                  </div>
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
