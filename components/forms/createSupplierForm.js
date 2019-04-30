import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import withIntl from "../../hoc/withIntl";

const messages = defineMessages({
  namePlaceholder: {
    id: "commercial-enquiries.supplier.form.name.placeHolder",
    defaultMessage: "Name of your organization"
  },
  nameMinValidation: {
    id: "commercial-enquiries.supplier.form.name.min",
    defaultMessage: "Organization Name is too short."
  },
  nameMaxValidation: {
    id: "commercial-enquiries.supplier.form.name.max",
    defaultMessage: "Organization Name is too large."
  },
  nameRequiredValidation: {
    id: "commercial-enquiries.supplier.form.name.required",
    defaultMessage: "Organization Name is required."
  },

  addressPlaceholder: {
    id: "commercial-enquiries.supplier.form.address.placeHolder",
    defaultMessage: "Your organization address"
  },
  addressMinValidation: {
    id: "commercial-enquiries.supplier.form.address.min",
    defaultMessage: "Address is too short."
  },
  addressMaxValidation: {
    id: "commercial-enquiries.supplier.form.address.max",
    defaultMessage: "Address is too large."
  },
  addressRequiredValidation: {
    id: "commercial-enquiries.supplier.form.address.required",
    defaultMessage: "Address is required."
  },

  cityPlaceholder: {
    id: "commercial-enquiries.supplier.form.city.placeHolder",
    defaultMessage: "City where your organization located on"
  },
  cityMinValidation: {
    id: "commercial-enquiries.supplier.form.city.min",
    defaultMessage: "City is too short."
  },
  cityMaxValidation: {
    id: "commercial-enquiries.supplier.form.city.max",
    defaultMessage: "City is too large."
  },
  cityRequiredValidation: {
    id: "commercial-enquiries.supplier.form.city.required",
    defaultMessage: "City is required."
  },

  statePlaceholder: {
    id: "commercial-enquiries.supplier.form.state.placeHolder",
    defaultMessage: "Your organization State/Province"
  },
  stateMaxValidation: {
    id: "commercial-enquiries.supplier.form.state.max",
    defaultMessage: "State is too large."
  },
  stateRequiredValidation: {
    id: "commercial-enquiries.supplier.form.state.required",
    defaultMessage: "State is required."
  },

  countryPlaceholder: {
    id: "commercial-enquiries.supplier.form.country.placeHolder",
    defaultMessage: "Country where your organization located on"
  },
  countryMinValidation: {
    id: "commercial-enquiries.supplier.form.country.min",
    defaultMessage: "Country is too short."
  },
  countryMaxValidation: {
    id: "commercial-enquiries.supplier.form.country.max",
    defaultMessage: "Country is too large."
  },
  countryRequiredValidation: {
    id: "commercial-enquiries.supplier.form.country.required",
    defaultMessage: "Country is required."
  },

  postalCodePlaceholder: {
    id: "commercial-enquiries.supplier.form.postal-code.placeHolder",
    defaultMessage: "Your organization Postal Code"
  },
  postalCodeMinValidation: {
    id: "commercial-enquiries.supplier.form.postal-code.min",
    defaultMessage: "Postal Code is too short."
  },
  postalCodeMaxValidation: {
    id: "commercial-enquiries.supplier.form.postal-code.max",
    defaultMessage: "Postal Code is too large."
  },
  postalCodeRequiredValidation: {
    id: "commercial-enquiries.supplier.form.postal-code.required",
    defaultMessage: "Postal Code is required."
  },

  firstNamePlaceholder: {
    id: "commercial-enquiries.supplier.form.first-name.placeHolder",
    defaultMessage: "First Name"
  },
  firstNameMinValidation: {
    id: "commercial-enquiries.supplier.form.first-name.min",
    defaultMessage: "First Name is too short."
  },
  firstNameMaxValidation: {
    id: "commercial-enquiries.supplier.form.first-name.max",
    defaultMessage: "First Name is too large."
  },
  firstNameRequiredValidation: {
    id: "commercial-enquiries.supplier.form.first-name.required",
    defaultMessage: "First Name is required."
  },

  lastNamePlaceholder: {
    id: "commercial-enquiries.supplier.form.last-name.placeHolder",
    defaultMessage: "Last Name"
  },
  lastNameMinValidation: {
    id: "commercial-enquiries.supplier.form.last-name.min",
    defaultMessage: "Last Name is too short."
  },
  lastNameMaxValidation: {
    id: "commercial-enquiries.supplier.form.last-name.max",
    defaultMessage: "Last Name is too large."
  },
  lastNameRequiredValidation: {
    id: "commercial-enquiries.supplier.form.last-name.required",
    defaultMessage: "Last Name is required."
  },

  phonePlaceholder: {
    id: "commercial-enquiries.supplier.form.phone.placeHolder",
    defaultMessage: "Phone Number"
  },
  phoneMinValidation: {
    id: "commercial-enquiries.supplier.form.phone.min",
    defaultMessage: "Phone Number is too short."
  },
  phoneMaxValidation: {
    id: "commercial-enquiries.supplier.form.phone.max",
    defaultMessage: "Phone Number is too large."
  },
  phoneRequiredValidation: {
    id: "commercial-enquiries.supplier.form.phone.required",
    defaultMessage: "Phone Number is required."
  },

  emailPlaceholder: {
    id: "commercial-enquiries.supplier.form.email.placeHolder",
    defaultMessage: "Email"
  },
  emailValidation: {
    id: "commercial-enquiries.supplier.form.email.validation",
    defaultMessage: "Email is invalid."
  },
  emailRequiredValidation: {
    id: "commercial-enquiries.supplier.form.email.required",
    defaultMessage: "Email is required."
  },
  enquiryPlaceholder: {
    id: "commercial-enquiries.supplier.form.enquiry.placeHolder",
    defaultMessage: "Enquiry"
  }
});

class CreateSupplierForm extends React.Component {
  Schema = Yup.object().shape({
    name: Yup.string()
      .min(2, this.props.intl.formatMessage(messages.nameMinValidation))
      .max(50, this.props.intl.formatMessage(messages.nameMaxValidation))
      .required(this.props.intl.formatMessage(messages.nameRequiredValidation)),
    address: Yup.string()
      .min(5, this.props.intl.formatMessage(messages.addressMinValidation))
      .max(200, this.props.intl.formatMessage(messages.addressMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.addressRequiredValidation)
      ),
    city: Yup.string()
      .min(3, this.props.intl.formatMessage(messages.cityMinValidation))
      .max(50, this.props.intl.formatMessage(messages.cityMaxValidation))
      .required(this.props.intl.formatMessage(messages.cityRequiredValidation)),
    state: Yup.string()
      .max(50, this.props.intl.formatMessage(messages.stateMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.stateRequiredValidation)
      ),
    country: Yup.string()
      .min(3, this.props.intl.formatMessage(messages.countryMinValidation))
      .max(50, this.props.intl.formatMessage(messages.countryMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.countryRequiredValidation)
      ),
    postalCode: Yup.string()
      .min(4, this.props.intl.formatMessage(messages.postalCodeMinValidation))
      .max(20, this.props.intl.formatMessage(messages.postalCodeMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.postalCodeRequiredValidation)
      ),
    firstName: Yup.string()
      .min(2, this.props.intl.formatMessage(messages.firstNameMinValidation))
      .max(50, this.props.intl.formatMessage(messages.firstNameMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.firstNameRequiredValidation)
      ),
    lastName: Yup.string()
      .min(2, this.props.intl.formatMessage(messages.lastNameMinValidation))
      .max(50, this.props.intl.formatMessage(messages.lastNameMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.lastNameRequiredValidation)
      ),
    phone: Yup.string()
      .min(4, this.props.intl.formatMessage(messages.phoneMinValidation))
      .max(50, this.props.intl.formatMessage(messages.phoneMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.phoneRequiredValidation)
      ),
    email: Yup.string()
      .email(this.props.intl.formatMessage(messages.emailValidation))
      .required(this.props.intl.formatMessage(messages.emailRequiredValidation))
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            name: "",
            address: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            enquiry: ""
          }}
          validationSchema={this.Schema}
          onSubmit={values => {
            props.onSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="commercial-enquiries.supplier.form.name"
                    defaultMessage="Organization/Business"
                  />
                  &nbsp; *
                </label>
                <div className="control">
                  <Field
                    name="name"
                    className="input"
                    type="text"
                    placeholder={this.props.intl.formatMessage(
                      messages.namePlaceholder
                    )}
                  />
                </div>
                {errors.name && touched.name ? (
                  <p className="help is-danger">{errors.name}</p>
                ) : null}
              </div>
              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="commercial-enquiries.supplier.form.address"
                    defaultMessage="Address"
                  />
                  &nbsp; *
                </label>
                <div className="control">
                  <Field
                    name="address"
                    className="input"
                    type="text"
                    placeholder={this.props.intl.formatMessage(
                      messages.addressPlaceholder
                    )}
                  />
                </div>
                {errors.address && touched.address ? (
                  <p className="help is-danger">{errors.address}</p>
                ) : null}
              </div>
              <div className="field">
                <div className="columns">
                  <div className="column">
                    <label className="label">
                      <FormattedMessage
                        id="commercial-enquiries.supplier.form.city"
                        defaultMessage="City"
                      />
                      &nbsp; *
                    </label>
                    <div className="control">
                      <Field
                        name="city"
                        className="input"
                        type="text"
                        placeholder={this.props.intl.formatMessage(
                          messages.cityPlaceholder
                        )}
                      />
                    </div>
                    {errors.city && touched.city ? (
                      <p className="help is-danger">{errors.city}</p>
                    ) : null}
                  </div>
                  <div className="column">
                    <label className="label">
                      <FormattedMessage
                        id="commercial-enquiries.supplier.form.state"
                        defaultMessage="State/Province"
                      />
                      &nbsp;*
                    </label>
                    <div className="control">
                      <Field
                        name="state"
                        className="input"
                        type="text"
                        placeholder={this.props.intl.formatMessage(
                          messages.statePlaceholder
                        )}
                      />
                    </div>
                    {errors.state && touched.state ? (
                      <p className="help is-danger">{errors.state}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="columns">
                  <div className="column">
                    <label className="label">
                      <FormattedMessage
                        id="commercial-enquiries.supplier.form.country"
                        defaultMessage="Country"
                      />
                      &nbsp;*
                    </label>
                    <div className="control">
                      <Field
                        defaultValue="United Kingdom"
                        component="select"
                        name="country"
                        className="input"
                      >
                        <option disabled value="">
                          {this.props.intl.formatMessage(
                            messages.countryPlaceholder
                          )}
                        </option>
                        <option>USA</option>
                        <option>Aaland Islands</option>
                        <option>Afghanistan</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                        <option>American Samoa</option>
                        <option>Andorra</option>
                        <option>Angola</option>
                        <option>Anguilla</option>
                        <option>Antigua And Barbuda</option>
                        <option>Argentina</option>
                        <option>Armenia</option>
                        <option>Aruba</option>
                        <option>Australia</option>
                        <option>Austria</option>
                        <option>Azerbaijan</option>
                        <option>Bahamas</option>
                        <option>Bahrain</option>
                        <option>Bangladesh</option>
                        <option>Barbados</option>
                        <option>Belarus</option>
                        <option>Belgium</option>
                        <option>Belize</option>
                        <option>Benin</option>
                        <option>Bermuda</option>
                        <option>Bhutan</option>
                        <option>Bolivia</option>
                        <option>Bonaire, Saint Eustatius and Saba</option>
                        <option>Bosnia and Herzegovina</option>
                        <option>Botswana</option>
                        <option>Bouvet Island</option>
                        <option>Brazil</option>
                        <option>Brunei Darussalam</option>
                        <option>Bulgaria</option>
                        <option>Burkina Faso</option>
                        <option>Burundi</option>
                        <option>Cambodia</option>
                        <option>Cameroon</option>
                        <option>Canada</option>
                        <option>Cape Verde</option>
                        <option>Cayman Islands</option>
                        <option>Central African Republic</option>
                        <option>Chad</option>
                        <option>Chile</option>
                        <option>China</option>
                        <option>Christmas Island</option>
                        <option>Colombia</option>
                        <option>Comoros</option>
                        <option>Congo</option>
                        <option>Cook Islands</option>
                        <option>Costa Rica</option>
                        <option>Cote D'Ivoire</option>
                        <option>Croatia</option>
                        <option>Cuba</option>
                        <option>Curacao</option>
                        <option>Cyprus</option>
                        <option>Czech Republic</option>
                        <option>Democratic Republic of the Congo</option>
                        <option>Denmark</option>
                        <option>Djibouti</option>
                        <option>Dominica</option>
                        <option>Dominican Republic</option>
                        <option>Ecuador</option>
                        <option>Egypt</option>
                        <option>El Salvador</option>
                        <option>Equatorial Guinea</option>
                        <option>Eritrea</option>
                        <option>Estonia</option>
                        <option>Ethiopia</option>
                        <option>Falkland Islands</option>
                        <option>Faroe Islands</option>
                        <option>Fiji</option>
                        <option>Finland</option>
                        <option>France</option>
                        <option>French Guiana</option>
                        <option>French Polynesia</option>
                        <option>Gabon</option>
                        <option>Gambia</option>
                        <option>Georgia</option>
                        <option>Germany</option>
                        <option>Ghana</option>
                        <option>Gibraltar</option>
                        <option>Greece</option>
                        <option>Greenland</option>
                        <option>Grenada</option>
                        <option>Guadeloupe</option>
                        <option>Guam</option>
                        <option>Guatemala</option>
                        <option>Guernsey</option>
                        <option>Guinea</option>
                        <option>Guyana</option>
                        <option>Haiti</option>
                        <option>Honduras</option>
                        <option>Hong Kong</option>
                        <option>Hungary</option>
                        <option>Iceland</option>
                        <option>India</option>
                        <option>Indonesia</option>
                        <option>Iran</option>
                        <option>Iraq</option>
                        <option>Ireland</option>
                        <option>Isle of Man</option>
                        <option>Israel</option>
                        <option>Italy</option>
                        <option>Jamaica</option>
                        <option>Japan</option>
                        <option>Jersey (Channel Islands)</option>
                        <option>Jordan</option>
                        <option>Kazakhstan</option>
                        <option>Kenya</option>
                        <option>Kiribati</option>
                        <option>Kuwait</option>
                        <option>Kyrgyzstan</option>
                        <option>Lao People's Democratic Republic</option>
                        <option>Latvia</option>
                        <option>Lebanon</option>
                        <option>Lesotho</option>
                        <option>Liberia</option>
                        <option>Libya</option>
                        <option>Liechtenstein</option>
                        <option>Lithuania</option>
                        <option>Luxembourg</option>
                        <option>Macau</option>
                        <option>Macedonia</option>
                        <option>Madagascar</option>
                        <option>Malawi</option>
                        <option>Malaysia</option>
                        <option>Maldives</option>
                        <option>Mali</option>
                        <option>Malta</option>
                        <option>Marshall Islands</option>
                        <option>Martinique</option>
                        <option>Mauritania</option>
                        <option>Mauritius</option>
                        <option>Mayotte</option>
                        <option>Mexico</option>
                        <option>Moldova, Republic of</option>
                        <option>Monaco</option>
                        <option>Mongolia</option>
                        <option>Montenegro</option>
                        <option>Montserrat</option>
                        <option>Morocco</option>
                        <option>Mozambique</option>
                        <option>Myanmar</option>
                        <option>Namibia</option>
                        <option>Nepal</option>
                        <option>Netherlands</option>
                        <option>Netherlands Antilles</option>
                        <option>New Caledonia</option>
                        <option>New Zealand</option>
                        <option>Nicaragua</option>
                        <option>Niger</option>
                        <option>Nigeria</option>
                        <option>Niue</option>
                        <option>Norfolk Island</option>
                        <option>North Korea</option>
                        <option>Norway</option>
                        <option>Oman</option>
                        <option>Pakistan</option>
                        <option>Palau</option>
                        <option>Palestine</option>
                        <option>Panama</option>
                        <option>Papua New Guinea</option>
                        <option>Paraguay</option>
                        <option>Peru</option>
                        <option>Philippines</option>
                        <option>Pitcairn</option>
                        <option>Poland</option>
                        <option>Portugal</option>
                        <option>Qatar</option>
                        <option>Republic of Kosovo</option>
                        <option>Reunion</option>
                        <option>Romania</option>
                        <option>Russia</option>
                        <option>Rwanda</option>
                        <option>Saint Kitts and Nevis</option>
                        <option>Saint Lucia</option>
                        <option>Saint Martin</option>
                        <option>Saint Vincent and the Grenadines</option>
                        <option>Samoa (Independent)</option>
                        <option>San Marino</option>
                        <option>Sao Tome and Principe</option>
                        <option>Saudi Arabia</option>
                        <option>Senegal</option>
                        <option>Serbia</option>
                        <option>Seychelles</option>
                        <option>Sierra Leone</option>
                        <option>Singapore</option>
                        <option>Sint Maarten</option>
                        <option>Slovakia</option>
                        <option>Slovenia</option>
                        <option>Solomon Islands</option>
                        <option>Somalia</option>
                        <option>South Africa</option>
                        <option>
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option>South Korea</option>
                        <option>South Sudan</option>
                        <option>Spain</option>
                        <option>Sri Lanka</option>
                        <option>Sudan</option>
                        <option>Suriname</option>
                        <option>Svalbard and Jan Mayen Islands</option>
                        <option>Swaziland</option>
                        <option>Sweden</option>
                        <option>Switzerland</option>
                        <option>Syria</option>
                        <option>Taiwan</option>
                        <option>Tajikistan</option>
                        <option>Tanzania</option>
                        <option>Thailand</option>
                        <option>Timor-Leste</option>
                        <option>Togo</option>
                        <option>Tonga</option>
                        <option>Trinidad and Tobago</option>
                        <option>Tunisia</option>
                        <option>Turkey</option>
                        <option>Turkmenistan</option>
                        <option>Turks &amp; Caicos Islands</option>
                        <option>Uganda</option>
                        <option>Ukraine</option>
                        <option>United Arab Emirates</option>
                        <option>United Kingdom</option>
                        <option>Uruguay</option>
                        <option>Uzbekistan</option>
                        <option>Vanuatu</option>
                        <option>Vatican City State (Holy See)</option>
                        <option>Venezuela</option>
                        <option>Vietnam</option>
                        <option>Virgin Islands (British)</option>
                        <option>Virgin Islands (U.S.)</option>
                        <option>Western Sahara</option>
                        <option>Yemen</option>
                        <option>Zambia</option>
                        <option>Zimbabwe</option>
                      </Field>
                    </div>
                    {errors.country && touched.country ? (
                      <p className="help is-danger">{errors.country}</p>
                    ) : null}
                  </div>
                  <div className="column">
                    <label className="label">
                      <FormattedMessage
                        id="commercial-enquiries.supplier.form.postal-code"
                        defaultMessage="Postal Code"
                      />
                      &nbsp;*
                    </label>
                    <div className="control">
                      <Field
                        name="postalCode"
                        className="input"
                        type="text"
                        placeholder={this.props.intl.formatMessage(
                          messages.postalCodePlaceholder
                        )}
                      />
                    </div>
                    {errors.postalCode && touched.postalCode ? (
                      <p className="help is-danger">{errors.postalCode}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <strong>
                <FormattedMessage
                  id="commercial-enquiries.supplier.form.contact-title"
                  defaultMessage="Contact Name"
                />
              </strong>

              <div className="field">
                <div className="columns">
                  <div className="column">
                    <label className="label">
                      <FormattedMessage
                        id="commercial-enquiries.supplier.form.first-name"
                        defaultMessage="First Name"
                      />
                      &nbsp;*
                    </label>
                    <div className="control">
                      <Field
                        name="firstName"
                        className="input"
                        type="text"
                        placeholder={this.props.intl.formatMessage(
                          messages.firstNamePlaceholder
                        )}
                      />
                    </div>
                    {errors.firstName && touched.firstName ? (
                      <p className="help is-danger">{errors.firstName}</p>
                    ) : null}
                  </div>
                  <div className="column">
                    <label className="label">
                      <FormattedMessage
                        id="commercial-enquiries.supplier.form.last-name"
                        defaultMessage="Last Name"
                      />
                      &nbsp;*
                    </label>
                    <div className="control">
                      <Field
                        name="lastName"
                        className="input"
                        type="text"
                        placeholder={this.props.intl.formatMessage(
                          messages.lastNamePlaceholder
                        )}
                      />
                    </div>
                    {errors.lastName && touched.lastName ? (
                      <p className="help is-danger">{errors.lastName}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">
                        <FormattedMessage
                          id="commercial-enquiries.supplier.form.phone"
                          defaultMessage="Phone Number"
                        />
                        &nbsp;*
                      </label>
                      <div className="control">
                        <Field
                          name="phone"
                          className="input"
                          type="tel"
                          placeholder={this.props.intl.formatMessage(
                            messages.phonePlaceholder
                          )}
                        />
                      </div>
                      {errors.phone && touched.phone ? (
                        <p className="help is-danger">{errors.phone}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">
                        <FormattedMessage
                          id="commercial-enquiries.supplier.form.email"
                          defaultMessage="Email"
                        />
                        &nbsp;*
                      </label>
                      <div className="control">
                        <Field
                          name="email"
                          className="input"
                          type="email"
                          placeholder={this.props.intl.formatMessage(
                            messages.emailPlaceholder
                          )}
                        />
                      </div>
                      {errors.email && touched.email ? (
                        <p className="help is-danger">{errors.email}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="commercial-enquiries.supplier.form.enquiry"
                    defaultMessage="Enquiry"
                  />
                </label>
                <div className="control">
                  <Field
                    component="textarea"
                    name="enquiry"
                    className="textarea"
                    placeholder={this.props.intl.formatMessage(
                      messages.enquiryPlaceholder
                    )}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className={[
                      "button is-primary",
                      this.props.onProgress ? "is-loading" : ""
                    ].join(" ")}
                  >
                    <FormattedMessage
                      id="common.submit"
                      defaultMessage="Submit"
                    />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default withIntl(CreateSupplierForm);
