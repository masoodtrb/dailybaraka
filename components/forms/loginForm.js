import React from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too short.")
    .max(30, "Password is too large.")
    .required("Password is required.")
});

const SignInForm = props => (
  <div>
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false
      }}
      validationSchema={SignInSchema}
      onSubmit={values => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
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

          <label className="checkbox">
            <Field name="rememberMe" component="input" type="checkbox" />
            Remember me
          </label>

          <br />
          <br />

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className={[
                  "button is-primary",
                  props.onProgress ? "is-loading" : ""
                ].join(" ")}
              >
                Sign In
              </button>
            </div>

            <div className="control forgot-pass">
              <Link href="/forgot-password">
                <a>Forgot Password?</a>
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignInForm;
