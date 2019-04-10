import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required.")
});

const SignUpForm = props => (
  <div>
    <Formik
      initialValues={{
        email: ""
      }}
      validationSchema={SignUpSchema}
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
