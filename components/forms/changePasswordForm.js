import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Old Password is too short.")
    .max(30, "Old Password is too large.")
    .required("Old Password is required."),
  newPassword: Yup.string()
    .min(6, "New Password is too short.")
    .max(30, "New Password is too large.")
    .required("New Password is required."),
  newRePassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm New Password does not match with New Password."
    )
    .required("Confirm New Password is required.")
});

const ChangePasswordForm = props => (
  <div>
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newRePassword: ""
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={values => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="field">
            <label className="label">Current Password *</label>
            <div className="control">
              <Field
                name="oldPassword"
                className="input"
                type="password"
                placeholder="Password"
              />
            </div>
            {errors.oldPassword && touched.oldPassword ? (
              <p className="help is-danger">{errors.oldPassword}</p>
            ) : null}
          </div>
          <div className="field">
            <label className="label">New Password *</label>
            <div className="control">
              <Field
                name="newPassword"
                className="input"
                type="password"
                placeholder="Password"
              />
            </div>
            {errors.newPassword && touched.newPassword ? (
              <p className="help is-danger">{errors.newPassword}</p>
            ) : null}
          </div>

          <div className="field">
            <label className="label">Confirm New Password *</label>
            <div className="control">
              <Field
                name="newRePassword"
                className="input"
                type="password"
                placeholder="Retype Password"
              />
            </div>
            {errors.newRePassword && touched.newRePassword ? (
              <p className="help is-danger">{errors.newRePassword}</p>
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

export default ChangePasswordForm;
