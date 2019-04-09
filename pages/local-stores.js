import React, { Component } from "react";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

let Leaflet, Map, TileLayer, Marker, Popup, StoreIcon;

class LocalStores extends Component {
  state = {
    center: {
      lat: 51.505,
      lng: -0.09
    },
    userLocation: null,
    zoom: 16,
    stores: [],
    selectedCategoryId: null
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

    this.forceUpdate();
  }

  updateStores = () => {
    // create parameters based on function inputs
    let parameters =
      "lat=" +
      this.state.center.lat +
      "&lng=" +
      this.state.center.lng +
      "&radius=" +
      //Math.ceil(this.state.zoom / 3);
      this.state.zoom;

    if (this.state.selectedCategoryId)
      parameters += "&categoryId=" + this.state.selectedCategoryId;

    console.log("updated");

    // request to get local stores based on lat & lng
    fetch("/api/shop/retailers/v1/load-by-location?" + parameters)
      .then(response => response.json())
      .then(json => {
        const stores = JSON.parse(JSON.stringify(this.state.stores));

        json.forEach((store, index) => {
          const isExist = stores.find(item => item.id === store.id);
          if (!isExist) stores.push(store);
        });

        this.setState({ stores });
      });
  };

  onUpdatePosition = event => {
    this.setState(
      {
        center: event.target.getCenter()
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
          alert(
            "For finding your location, Please accept the Location Access Request on your browser."
          );

          console.error(
            "An error has occurred while retrieving location",
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

  render() {
    return (
      <div>
        <Head title="Local Stores" />
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
                    draggable={false}
                    position={{
                      lat: store.lat,
                      lng: store.lng
                    }}
                    icon={StoreIcon}
                  >
                    <Popup>
                      <div class="box">
                        <article class="media">
                          <div class="media-left">
                            <figure class="image">
                              <img
                                src={
                                  store.logo
                                    ? process.env.API_URL +
                                      "api/shop/general/v1/file/" +
                                      store.logo.id
                                    : "/static/images/128x128.png"
                                }
                                alt={store.name}
                              />
                            </figure>
                          </div>
                          <div class="media-content">
                            <div class="content">
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

              <div className="map__buttons">
                <button
                  className="button is-primary map__location"
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

export default LocalStores;
