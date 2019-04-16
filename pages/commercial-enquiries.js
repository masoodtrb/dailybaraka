import React, { Component } from "react";
import Recaptcha from "react-google-invisible-recaptcha";
import Link from "next/link";

import Head from "../components/head";
import Nav from "../components/nav";

import CreateStoreForm from "../components/forms/createStoreForm";
import CreateSupplierForm from "../components/forms/createSupplierForm";

import "../styles/main.scss";

let Map, TileLayer, Marker;

class Enquiry extends Component {
  state = {
    marker: {
      lat: 51.505,
      lng: -0.09
    },
    zoom: 16,
    tab: "store",
    storeForm: { state: "INITIATE", error: "" },
    storeFormData: {},
    supplierForm: { state: "INITIATE", error: "" },
    supplierFormData: {}
  };

  componentDidMount() {
    // leaflet library wont work on SSR, We have to load map components on client side,
    // read this github issue for more: https://github.com/PaulLeCam/react-leaflet/issues/45
    Map = require("react-leaflet").Map;
    TileLayer = require("react-leaflet").TileLayer;
    Marker = require("react-leaflet").Marker;

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
            "For finding your location, Please accept the Location Access Request on your browser. " +
              "Also you can find your organization location from the map."
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

  onChangeTab = (event, tabState) => {
    event.preventDefault();
    this.setState({ tab: tabState });
  };

  onStoreFormSRecaptchaError = errorType => {
    this.setState({
      storeForm: {
        state: "ERROR",
        error: (
          <React.Fragment>
            The authorizing system, to detect you as a <strong>HUMAN</strong>{" "}
            not a 🤖, occurred an error.
            <br />
            You could reload page to continue. If you receive this error again,
            please{" "}
            <Link href="/page/contact-us">
              <a>get in touch with us.</a>
            </Link>
          </React.Fragment>
        )
      }
    });
  };

  onStoreFormSubmit = formData => {
    formData.latitude = this.state.marker.lat;
    formData.longitude = this.state.marker.lng;

    this.setState(
      {
        storeForm: { state: "SUBMITTING" },
        storeFormData: formData
      },
      () => {
        this.recaptchaStoreFormRef.execute();
      }
    );
  };

  onStoreFormRecaptchaResolved = () => {
    const recaptchaToken = this.recaptchaStoreFormRef.getResponse();

    const formData = this.state.storeFormData;

    fetch("/api/shop/retailers/v1/create", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        address: formData.address,
        city: formData.city,
        country: formData.country,
        lat: formData.latitude,
        lng: formData.longitude,
        name: formData.name,
        phoneNumbers: formData.phone,
        postalCode: formData.postalCode,
        province: formData.state,
        enquiry: formData.enquiry,
        owner: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        },
        recaptchaToken
      })
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          this.setState({
            storeForm: {
              state: "ERROR",
              error:
                "Can not process the request. Type of error: " +
                response.status +
                ", response status: " +
                response.statusText
            }
          });
          this.recaptchaRef.reset();
        }
      })
      .then(text => (text.length ? JSON.parse(text) : {}))
      .then(json => {
        if (json.status >= 300) {
          this.setState({
            storeForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          this.recaptchaStoreFormRef.reset();

          return;
        }

        this.setState({
          storeForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  onSupplierFormRecaptchaError = errorType => {
    this.setState({
      supplierForm: {
        state: "ERROR",
        error: (
          <React.Fragment>
            The authorizing system, to detect you as a <strong>HUMAN</strong>{" "}
            not a 🤖, occurred an error.
            <br />
            You could reload page to continue. If you receive this error again,
            please <a href="/page/contact-us">get in touch with us.</a>
          </React.Fragment>
        )
      }
    });
  };

  onSupplierFormSubmit = formData => {
    this.setState(
      {
        supplierForm: { state: "SUBMITTING" },
        supplierFormData: formData
      },
      () => {
        this.recaptchaSupplierFormRef.execute();
      }
    );
  };

  onSupplierFormRecaptchaResolved = () => {
    const recaptchaToken = this.recaptchaSupplierFormRef.getResponse();

    const formData = this.state.storeFormData;

    fetch("/api/shop/suppliers/v1/create", {
      crossDomain: true,
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        address: formData.address,
        city: formData.city,
        country: formData.country,
        lat: formData.latitude,
        lng: formData.longitude,
        name: formData.name,
        phoneNumbers: formData.phone,
        postalCode: formData.postalCode,
        province: formData.state,
        enquiry: formData.enquiry,
        owner: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        },
        recaptchaToken
      })
    })
      .then(response => {
        if (response.ok) {
          this.setState({ supplierForm: { state: "SUCCESS" } });
          return response.text();
        } else {
          this.setState({
            supplierForm: {
              state: "ERROR",
              error:
                "Can not process the request. Type of error: " +
                response.status +
                ", response status: " +
                response.statusText
            }
          });
          this.recaptchaSupplierFormRef.reset();
        }
      })
      .then(text => (text.length ? JSON.parse(text) : {}))
      .then(json => {
        if (json.status >= 300) {
          this.setState({
            supplierForm: {
              state: "ERROR",
              error: json.detail
            }
          });
          this.recaptchaSupplierFormRef.reset();
          return;
        }

        this.setState({
          supplierForm: {
            state: "SUCCESS"
          }
        });
      });
  };

  render() {
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];
    const { tab } = this.state;
    return (
      <div>
        <Head title="Commercial Enquiries" />
        <Nav />

        <div className="page enquiry">
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
              <div
                className={[
                  "columns animate",
                  this.state.storeForm.state === "SUCCESS"
                    ? "animate-hidden"
                    : ""
                ].join(" ")}
              >
                <div className="column is-6">
                  {this.state.storeForm.state === "ERROR" && (
                    <div className="notification is-danger">
                      <button className="delete" />
                      <strong>An error has occurred</strong>
                      <br />
                      <p>{this.state.storeForm.error}</p>
                    </div>
                  )}

                  <CreateStoreForm
                    onProgress={this.state.storeForm.state === "SUBMITTING"}
                    onSubmit={formData => this.onStoreFormSubmit(formData)}
                  />

                  <Recaptcha
                    ref={ref => (this.recaptchaStoreFormRef = ref)}
                    sitekey={process.env.RECAPTCHA_KEY}
                    onResolved={() => this.onStoreFormRecaptchaResolved()}
                    onError={() => this.onStoreFormSRecaptchaError("ERROR")}
                    onExpired={() => this.onStoreFormSRecaptchaError("EXPIRED")}
                  />
                </div>
                <div className="column is-6">
                  <div className="has-text-centered">
                    <button
                      className="button is-primary"
                      onClick={e => this.onSetLocation(e)}
                    >
                      <i className="fas fa-map-marker-alt" />
                      &nbsp;Get my location
                    </button>
                  </div>
                  <br />
                  <div>
                    {Map ? (
                      <Map
                        center={markerPosition}
                        zoom={this.state.zoom}
                        className="enquiry__map"
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
              <div
                className={[
                  "animate hidden",
                  this.state.storeForm.state === "SUCCESS" ? "animate-show" : ""
                ].join(" ")}
              >
                <div className="notification is-success">
                  <strong>
                    Your store information has been successfully submitted.
                  </strong>
                  <br />
                  We will contact you as soon as possible.
                </div>
              </div>
            </div>
            <div
              className={[
                "tab-content",
                tab === "supplier" ? "active" : null
              ].join(" ")}
            >
              <div
                className={[
                  "columns animate",
                  this.state.supplierForm.state === "SUCCESS"
                    ? "animate-hidden"
                    : ""
                ].join(" ")}
              >
                <div className="column is-6">
                  {this.state.supplierForm.state === "ERROR" && (
                    <div className="notification is-danger">
                      <button className="delete" />
                      <strong>An error has occurred</strong>
                      <br />
                      <p>{this.state.supplierForm.error}</p>
                    </div>
                  )}
                  <CreateSupplierForm
                    onProgress={this.state.supplierForm.state === "SUBMITTING"}
                    onSubmit={formData => this.onSupplierFormSubmit(formData)}
                  />
                  <Recaptcha
                    ref={ref => (this.recaptchaSupplierFormRef = ref)}
                    sitekey={process.env.RECAPTCHA_KEY}
                    onResolved={() => this.onSupplierFormRecaptchaResolved()}
                    onError={() => this.onSupplierFormRecaptchaError("ERROR")}
                    onExpired={() =>
                      this.onSupplierFormRecaptchaError("EXPIRED")
                    }
                  />
                </div>
              </div>

              <div
                className={[
                  "animate hidden",
                  this.state.supplierForm.state === "SUCCESS"
                    ? "animate-show"
                    : ""
                ].join(" ")}
              >
                <div className="notification is-success">
                  <strong>
                    Your supplier information has been successfully submitted.
                  </strong>
                  <br />
                  We will contact you as soon as possible.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Enquiry;
