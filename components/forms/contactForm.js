import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ContactFormSchema = Yup.object().shape({
  address: Yup.string()
    .min(5, "Address is too short.")
    .max(200, "Address is too large.")
    .required("Address is required."),
  city: Yup.string()
    .min(3, "City is too short.")
    .max(50, "City is too large.")
    .required("City is required."),
  state: Yup.string()
    .max(50, "State is too large.")
    .required("State is required."),
  country: Yup.string()
    .min(3, "Country is too short.")
    .max(50, "Country is too large.")
    .required("Country is required."),
  postalCode: Yup.string()
    .min(4, "Postal Code is too short.")
    .max(20, "Postal Code is too large.")
    .required("Postal Code is required."),
  firstName: Yup.string()
    .min(2, "First Name is too short.")
    .max(50, "First Name is too large.")
    .required("First Name is required."),
  lastName: Yup.string()
    .min(2, "Last Name is too short.")
    .max(50, "Last Name is too large.")
    .required("Last Name is required."),
  phone: Yup.string()
    .min(4, "Phone is too short.")
    .max(50, "Phone is too large.")
    .required("Phone is required."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required.")
});

const ContactFormForm = props => (
  <div>
    <Formik
      initialValues={{
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: ""
      }}
      validationSchema={ContactFormSchema}
      onSubmit={values => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="field">
            <div className="columns">
              <div className="column">
                <label className="label">First Name *</label>
                <div className="control">
                  <Field
                    name="firstName"
                    className="input"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                {errors.firstName && touched.firstName ? (
                  <p className="help is-danger">{errors.firstName}</p>
                ) : null}
              </div>
              <div className="column">
                <label className="label">Last Name *</label>
                <div className="control">
                  <Field
                    name="lastName"
                    className="input"
                    type="text"
                    placeholder="Your Last Name"
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
                  <label className="label">Phone Number *</label>
                  <div className="control">
                    <Field
                      name="phone"
                      className="input"
                      type="tel"
                      placeholder="Phone Number"
                    />
                  </div>
                  {errors.phone && touched.phone ? (
                    <p className="help is-danger">{errors.phone}</p>
                  ) : null}
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Email *</label>
                  <div className="control">
                    <Field
                      name="email"
                      className="input"
                      type="email"
                      placeholder="Email"
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
            <label className="label">Address *</label>
            <div className="control">
              <Field
                name="address"
                className="input"
                type="text"
                placeholder="Your address"
              />
            </div>
            {errors.address && touched.address ? (
              <p className="help is-danger">{errors.address}</p>
            ) : null}
          </div>

          <div className="field">
            <div className="columns">
              <div className="column">
                <label className="label">City *</label>
                <div className="control">
                  <Field
                    name="city"
                    className="input"
                    type="text"
                    placeholder="City where you are located on"
                  />
                </div>
                {errors.city && touched.city ? (
                  <p className="help is-danger">{errors.city}</p>
                ) : null}
              </div>
              <div className="column">
                <label className="label">State *</label>
                <div className="control">
                  <Field
                    name="state"
                    className="input"
                    type="text"
                    placeholder="Your State"
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
                <label className="label">Country *</label>
                <div className="control">
                  <Field component="select" name="country" class="input">
                    <option disabled value="">
                      Country where your organization located on
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
                    <option selected="">United Kingdom</option>
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
                <label className="label">Postal Code *</label>
                <div className="control">
                  <Field
                    name="postalCode"
                    className="input"
                    type="text"
                    placeholder="Your organization Postal Code"
                  />
                </div>
                {errors.postalCode && touched.postalCode ? (
                  <p className="help is-danger">{errors.postalCode}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <Field component="textarea" name="message" className="textarea" />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                type="submit"
                className={[
                  "button is-primary",
                  props.onProgress ? "is-loading" : ""
                ].join(" ")}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default ContactFormForm;
