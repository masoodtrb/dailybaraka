import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const CreateSupplierSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Organization Name is too short.")
    .max(50, "Organization Name is too large.")
    .required("Organization Name is required."),
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

const CreateSupplierForm = props => (
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
      validationSchema={CreateSupplierSchema}
      onSubmit={values => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="field">
            <label className="label">Organization/Business *</label>
            <div className="control">
              <Field
                name="name"
                className="input"
                type="text"
                placeholder="Name of your organization"
              />
            </div>
            {errors.name && touched.name ? (
              <p className="help is-danger">{errors.name}</p>
            ) : null}
          </div>
          <div className="field">
            <label className="label">Address *</label>
            <div className="control">
              <Field
                name="address"
                className="input"
                type="text"
                placeholder="Your organization address"
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
                    placeholder="City where your organization located on"
                  />
                </div>
                {errors.city && touched.city ? (
                  <p className="help is-danger">{errors.city}</p>
                ) : null}
              </div>
              <div className="column">
                <label className="label">State/Provience *</label>
                <div className="control">
                  <Field
                    name="state"
                    className="input"
                    type="text"
                    placeholder="Your organization State/Provience"
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
                  <Field
                    name="country"
                    className="input"
                    type="text"
                    placeholder="Country where your organization located on"
                  />
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

          <strong>Contact Name</strong>

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
            <label className="label">enquiry</label>
            <div className="control">
              <Field
                component="textarea"
                name="enquiry"
                className="textarea"
                placeholder="enquiry"
              />
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

export default CreateSupplierForm;
