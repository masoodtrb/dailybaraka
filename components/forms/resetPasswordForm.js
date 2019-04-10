import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
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

const ResetPasswordForm = props => (
  <div>
    <Formik
      initialValues={{
        password: "",
        rePassword: ""
      }}
      validationSchema={ResetPasswordSchema}
      onSubmit={values => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
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

export default ResetPasswordForm;
