import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const UpdateProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name is too short.")
    .max(50, "First Name is too large.")
    .required("First Name is required."),
  lastName: Yup.string()
    .min(2, "Last Name is too short.")
    .max(50, "Last Name is too large.")
    .required("Last Name is required.")
});

const UpdateProfileForm = props => (
  <div>
    <Formik
      initialValues={{
        firstName: props.defaultValues.firstName,
        lastName: props.defaultValues.lastName
      }}
      validationSchema={UpdateProfileSchema}
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

export default UpdateProfileForm;
