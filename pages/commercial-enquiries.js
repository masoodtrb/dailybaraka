import React, { Component } from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import "../styles/main.scss";

let Map, TileLayer, Marker, Popup;

class Product extends Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  state = {
    marker: {
      lat: 51.505,
      lng: -0.09
    },
    zoom: 16,
    tab: "store"
  };

  componentDidMount() {
    // leaflet library wont work on SSR, We have to load map components on client side,
    // read this github issue for more: https://github.com/PaulLeCam/react-leaflet/issues/45
    Map = require("react-leaflet").Map;
    TileLayer = require("react-leaflet").TileLayer;
    Marker = require("react-leaflet").Marker;
    Popup = require("react-leaflet").Popup;

    this.forceUpdate();
  }

  onUpdatePosition = event => {
    this.setState({
      marker: event.target.getCenter()
    });
  };

  onSetLocation = event => {
    event.preventDefault();

    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser

      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            marker: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        error => {
          // for when getting location results in an error
          alert(
            "For find your location, Accept the location access request on your browser please. " +
              "Also you can find your organization location from the map."
          );

          console.error(
            "An error has occured while retrieving location",
            error
          );
        }
      );
    } else {
      alert(
        "Your browser does not support this feature. Please find your organization location from the map."
      );
    }
  };

  onChangeTab = (event, tabState) => {
    event.preventDefault();
    this.setState({ tab: tabState });
  };

  render() {
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];
    const { tab } = this.state;
    return (
      <div>
        <Head title="Sign up" />
        <Nav />

        <div className="page signup">
          <div className="container">
            <div className="tabs">
              <ul>
                <li className={tab === "store" ? "is-active" : ""}>
                  <a href="#" onClick={e => this.onChangeTab(e, "store")}>
                    Local Stores/Service Provider
                  </a>
                </li>
                <li className={tab === "supplier" ? "is-active" : ""}>
                  <a href="#" onClick={e => this.onChangeTab(e, "supplier")}>
                    Supplier
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={[
                "tab-content",
                tab === "store" ? "active" : null
              ].join(" ")}
            >
              <div className="columns">
                <div className="column is-6">
                  <form onSubmit={e => this.onStoreSubmit(e)}>
                    <div className="field">
                      <label className="label">Organization/Business *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Name of your organization"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Address *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Your organization address"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="columns">
                        <div className="column">
                          <label className="label">City *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="City where your organization located on"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <label className="label">State/Provience *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your organization State/Provience"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <div className="columns">
                        <div className="column">
                          <label className="label">Country *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Country where your organization located on"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <label className="label">Postal Code *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your organization Postal Code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <strong>Contact Name</strong>

                    <div className="field">
                      <div className="columns">
                        <div className="column">
                          <label className="label">First Name *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your name"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <label className="label">Last name *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your Last name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Phone Number *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="tel"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Email *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Enquery</label>
                      <div className="control">
                        <textarea class="textarea" placeholder="Enquery" />
                      </div>
                    </div>

                    <input
                      type="hidden"
                      name="latitude"
                      value={this.state.marker.lat}
                    />
                    <input
                      type="hidden"
                      name="longitude"
                      value={this.state.marker.lng}
                    />

                    <div className="field">
                      <div className="control">
                        <button className="button is-primary">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="column is-6">
                  <div className="has-text-centered">
                    <button
                      className="button is-primary"
                      onClick={e => this.onSetLocation(e)}
                    >
                      <i class="fas fa-map-marker-alt" />
                      &nbsp;Get my location
                    </button>
                  </div>
                  <br />
                  <div>
                    {Map ? (
                      <Map
                        center={markerPosition}
                        zoom={this.state.zoom}
                        className="signup__map"
                        onMove={this.onUpdatePosition}
                      >
                        <TileLayer
                          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker draggable={false} position={markerPosition} />
                      </Map>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={[
                "tab-content",
                tab === "supplier" ? "active" : null
              ].join(" ")}
            >
              <div className="columns">
                <div className="column is-6">
                  <form onSubmit={e => this.onSupplierSubmit(e)}>
                    <div className="field">
                      <label className="label">Organization/Business *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Name of your organization"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Address *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Your organization address"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="columns">
                        <div className="column">
                          <label className="label">City *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="City where your organization located on"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <label className="label">State/Provience *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your organization State/Provience"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <div className="columns">
                        <div className="column">
                          <label className="label">Country *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Country where your organization located on"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <label className="label">Postal Code *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your organization Postal Code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <strong>Contact Name</strong>

                    <div className="field">
                      <div className="columns">
                        <div className="column">
                          <label className="label">First Name *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your name"
                            />
                          </div>
                        </div>
                        <div className="column">
                          <label className="label">Last name *</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              placeholder="Your Last name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Phone Number *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="tel"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Email *</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Enquery</label>
                      <div className="control">
                        <textarea class="textarea" placeholder="Enquery" />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <button className="button is-primary">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
