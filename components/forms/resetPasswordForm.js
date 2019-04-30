import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import withIntl from "../../hoc/withIntl";

const messages = defineMessages({
  passwordPlaceHolder: {
    id: "profile.change-password.form.password.placeholder",
    defaultMessage: "Password"
  },
  passwordMin: {
    id: "profile.change-password.form.password.min",
    defaultMessage: "Password is too short."
  },
  passwordMax: {
    id: "profile.change-password.form.password.max",
    defaultMessage: "Password is too large."
  },
  passwordRequired: {
    id: "profile.change-password.form.password.required",
    defaultMessage: "Password is required."
  },

  rePasswordPlaceHolder: {
    id: "profile.change-password.form.confirm-password.placeholder",
    defaultMessage: "Retype Password"
  },
  rePasswordNotMatch: {
    id: "profile.change-password.form.confirm-password.not-match",
    defaultMessage: "Confirm Password does not match with Password."
  },
  rePasswordRequired: {
    id: "profile.change-password.form.confirm-password.required",
    defaultMessage: "Confirm Password is required."
  }
});

class ResetPasswordForm extends React.Component {
  Schema = Yup.object().shape({
    password: Yup.string()
      .min(6, this.props.intl.formatMessage(messages.passwordMin))
      .max(30, this.props.intl.formatMessage(messages.passwordMax))
      .required(this.props.intl.formatMessage(messages.passwordRequired)),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        this.props.intl.formatMessage(messages.rePasswordNotMatch)
      )
      .required(this.props.intl.formatMessage(messages.rePasswordRequired))
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            password: "",
            rePassword: ""
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
                    id="reset-password.password"
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
                      messages.passwordPlaceHolder
                    )}
                  />
                </div>
                {errors.password && touched.password ? (
                  <p className="help is-danger">{errors.password}</p>
                ) : null}
              </div>

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="reset-password.confirm-password"
                    defaultMessage="Confirm Password"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="rePassword"
                    className="input"
                    type="password"
                    placeholder={this.props.intl.formatMessage(
                      messages.rePasswordPlaceHolder
                    )}
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
export default withIntl(ResetPasswordForm);
