import React, { Component } from "react";
import { FormattedMessage, defineMessages } from "react-intl";

import * as sectorService from "../services/sector";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";
import withIntl from "../hoc/withIntl";

let Leaflet, Map, TileLayer, Marker, Popup, StoreIcon;

const messages = defineMessages({
  title: {
    id: "local-stores.title",
    defaultMessage: "Local Stores"
  },
  geolocationError: {
    id: "common.geolocation.error",
    defaultMessage:
      "For finding your location, Please accept the Location Access Request on your browser. Also you can find your organization location from the map."
  },
  geolocationNotSupport: {
    id: "common.geolocation.not-support",
    defaultMessage:
      "Your browser does not support this feature. Please find your organization location from the map."
  }
});

class LocalStores extends Component {
  static async getInitialProps({ req }) {
    return { sectors: await sectorService.getAll() };
  }

  state = {
    center: {
      lat: 51.505,
      lng: -0.09
    },
    userLocation: null,
    zoom: 16,
    stores: [],
    openFilters: false
  };

  storeIcon = {};

  componentDidMount() {
    // leaflet library wont work on SSR, We have to load map components on client side,
    // read this github issue for more: https://github.com/PaulLeCam/react-leaflet/issues/45
    Leaflet = require("leaflet");
    Map = require("react-leaflet").Map;
    TileLayer = require("react-leaflet").TileLayer;
    Marker = require("react-leaflet").Marker;
    Popup = require("react-leaflet").Popup;

    StoreIcon = new Leaflet.Icon({
      iconUrl: "../static/images/store.svg",
      iconRetinaUrl: "../static/images/store.svg",
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
      iconSize: [44, 44]
    });

    this.forceUpdate(() => {
      this.updateStores();
    });
  }

  updateStores = () => {
    // create parameters based on function inputs
    let parameters = {
      lat: this.state.center.lat,
      lng: this.state.center.lng,
      radius: 5
    };

    if (this.state.selectedSectorId)
      parameters.categoryId = this.state.selectedSectorId;

    // request to get local stores based on lat & lng
    fetch("/api/shop/retailers/v1/load-by-location", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(parameters)
    })
      .then(response => response.json())
      .then(json => {
        if (json.status && json.status >= 300) {
          alert("Error on server: " + json.detail);
          return;
        }

        const stores = JSON.parse(JSON.stringify(this.state.stores));
        // add new stores to list
        json.result.forEach((store, index) => {
          const isExist = stores.find(item => item.id === store.id);
          if (!isExist) stores.push(store);
        });

        this.setState({ stores });
      });
  };

  onUpdatePosition = event => {
    this.setState(
      {
        center: event.target.getCenter(),
        zoom: event.target.getZoom()
      },
      () => {
        this.updateStores();
      }
    );
  };

  onSetLocation = event => {
    event.preventDefault();

    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser

      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          this.setState(
            {
              userLocation: location,
              center: location
            },
            () => {
              this.updateStores();
            }
          );
        },
        error => {
          // for when getting location results in an error
          alert(this.props.intl.formatMessage(messages.geolocationError));

          console.error(
            "An error has occurred while retrieving location",
            error
          );
        }
      );
    } else {
      alert(this.props.intl.formatMessage(messages.geolocationNotSupport));
    }
  };

  onMapFilters = event => {
    event.preventDefault();

    this.setState({
      openFilters: !this.state.openFilters
    });
  };

  onSectorFilter = (sectorId = null) => {
    this.setState(
      {
        selectedSectorId: sectorId,
        stores: []
      },
      () => {
        this.updateStores(sectorId);
      }
    );
  };

  render() {
    return (
      <div>
        <Head title={this.props.intl.formatMessage(messages.title)} />
        <Nav />

        <div className="page local-stores">
          {Map ? (
            <div className="map">
              <Map
                center={this.state.center}
                zoom={this.state.zoom}
                className="map__component"
                onMoveEnd={this.onUpdatePosition}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {this.state.userLocation && (
                  <Marker
                    draggable={false}
                    position={this.state.userLocation}
                  />
                )}

                {this.state.stores.map(store => (
                  <Marker
                    key={"store-" + store.id}
                    draggable={false}
                    position={{
                      lat: store.lat,
                      lng: store.lng
                    }}
                    icon={StoreIcon}
                  >
                    <Popup>
                      <div className="box">
                        <article className="media">
                          <div className="media-left">
                            <figure className="image">
                              <img
                                src={
                                  store.logo
                                    ? process.env.API_URL +
                                      "/api/shop/general/v1/file/" +
                                      store.logo.id
                                    : "/static/images/128x128.png"
                                }
                                alt={store.name}
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{store.name}</strong>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </Map>

              <div
                className={[
                  "map__filters",
                  this.state.openFilters ? "active" : ""
                ].join(" ")}
              >
                <div className="control">
                  <label
                    className="radio"
                    onClick={() => this.onSectorFilter()}
                  >
                    <input
                      type="radio"
                      name="sector"
                      checked={!this.state.selectedSectorId}
                    />
                    <FormattedMessage id="sectors.all" defaultMessage="All" />
                  </label>
                  {this.props.sectors &&
                    this.props.sectors.result &&
                    this.props.sectors.result.map(sector => (
                      <label key={"sector-" + sector.id} className="radio">
                        <input
                          type="radio"
                          name="sector"
                          value={sector.id}
                          onClick={() => this.onSectorFilter(sector.id)}
                          checked={this.state.selectedSectorId === sector.id}
                        />
                        {sector.name}
                      </label>
                    ))}
                </div>
              </div>

              <div className="map__buttons">
                <button
                  className="button is-primary"
                  onClick={e => this.onMapFilters(e)}
                >
                  <i className="fas fa-list" />
                </button>
                <button
                  className="button is-primary"
                  onClick={e => this.onSetLocation(e)}
                >
                  <i className="fas fa-map-marker-alt" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withIntl(LocalStores);
