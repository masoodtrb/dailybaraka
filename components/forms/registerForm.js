import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
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
    .max(50, "Phone is too large."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too short.")
    .max(30, "Password is too large.")
    .required("Password is required."),
  rePassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm Password does not match with Password."
    )
    .required("Confirm Password is required.")
});

const SignUpForm = props => (
  <div>
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        rePassword: ""
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="field">
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

          <div className="field">
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

          <div className="field">
            <label className="label">Email *</label>
            <div className="control">
              <Field
                name="email"
                className="input"
                type="text"
                placeholder="Your Email"
              />
            </div>
            {errors.email && touched.email ? (
              <p className="help is-danger">{errors.email}</p>
            ) : null}
          </div>

          <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <Field
                name="phone"
                className="input"
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password *</label>
            <div className="control">
              <Field
                name="password"
                className="input"
                type="password"
                placeholder="Password"
              />
            </div>
            {errors.password && touched.password ? (
              <p className="help is-danger">{errors.password}</p>
            ) : null}
          </div>

          <div className="field">
            <label className="label">Confirm Password *</label>
            <div className="control">
              <Field
                name="rePassword"
                className="input"
                type="password"
                placeholder="Retype Password"
              />
            </div>
            {errors.rePassword && touched.rePassword ? (
              <p className="help is-danger">{errors.rePassword}</p>
            ) : null}
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

export default SignUpForm;
