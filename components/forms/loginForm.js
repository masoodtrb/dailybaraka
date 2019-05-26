import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import withIntl from "../../hoc/withIntl";

const messages = defineMessages({
  emailPlaceholder: {
    id: "login.form.email.placeholder",
    defaultMessage: "Your Email"
  },
  emailRequiredValidation: {
    id: "login.form.email.required",
    defaultMessage: "Email is required."
  },
  passwordPlaceholder: {
    id: "login.form.password.placeholder",
    defaultMessage: "Password"
  },
  passwordRequiredValidation: {
    id: "login.form.password.required",
    defaultMessage: "Password is required."
  }
});

class SignInForm extends React.Component {
  Schema = Yup.object().shape({
    email: Yup.string().required(
      this.props.intl.formatMessage(messages.emailRequiredValidation)
    ),
    password: Yup.string().required(
      this.props.intl.formatMessage(messages.passwordRequiredValidation)
    )
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false
          }}
          validationSchema={this.Schema}
          onSubmit={values => {
            this.props.onSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="login.form.email"
                    defaultMessage="Email"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="email"
                    className="input"
                    type="text"
                    placeholder={this.props.intl.formatMessage(
                      messages.emailPlaceholder
                    )}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="help is-danger">{errors.email}</p>
                ) : null}
              </div>

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="login.form.password"
                    defaultMessage="Password"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="password"
                    className="input"
                    type="password"
                    placeholder={this.props.intl.formatMessage(
                      messages.passwordPlaceholder
                    )}
                  />
                </div>
                {errors.password && touched.password ? (
                  <p className="help is-danger">{errors.password}</p>
                ) : null}
              </div>

              <label className="checkbox">
                <Field name="rememberMe" component="input" type="checkbox" />
                &nbsp;
                <FormattedMessage
                  id="login.form.remember-me"
                  defaultMessage="Remember me"
                />
              </label>

              <br />
              <br />

              <div className="field is-grouped">
                <div className="control">
                  <button
                    type="submit"
                    className={[
                      "button is-primary",
                      this.props.onProgress ? "is-loading" : ""
                    ].join(" ")}
                  >
                    <FormattedMessage
                      id="login.form.submit"
                      defaultMessage="Sign In"
                    />
                  </button>
                </div>

                <div className="control forgot-pass">
                  <Link
                    href={`/forgot-password?lang=${this.props.intl.locale}`}
                    as={`/${this.props.intl.locale}/forgot-password`}
                  >
                    <a>
                      <FormattedMessage
                        id="login.form.forgot-pass-hint"
                        defaultMessage="Forgot Password?"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withIntl(SignInForm);
