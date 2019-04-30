import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormattedMessage, defineMessages } from "react-intl";
import withIntl from "../../hoc/withIntl";

const messages = defineMessages({
  oldPasswordPlaceHolder: {
    id: "profile.change-password.form.old-password.placeholder",
    defaultMessage: "Password"
  },
  oldPasswordMin: {
    id: "profile.change-password.form.old-password.min",
    defaultMessage: "Old Password is too short."
  },
  oldPasswordMax: {
    id: "profile.change-password.form.old-password.max",
    defaultMessage: "Old Password is too large."
  },
  oldPasswordRequired: {
    id: "profile.change-password.form.old-password.required",
    defaultMessage: "Old Password is required."
  },

  newPasswordPlaceHolder: {
    id: "profile.change-password.form.new-password.placeholder",
    defaultMessage: "New Password"
  },
  newPasswordMin: {
    id: "profile.change-password.form.new-password.min",
    defaultMessage: "New Password is too short."
  },
  newPasswordMax: {
    id: "profile.change-password.form.new-password.max",
    defaultMessage: "New Password is too large."
  },
  newPasswordRequired: {
    id: "profile.change-password.form.new-password.required",
    defaultMessage: "New Password is required."
  },

  newRePasswordPlaceHolder: {
    id: "profile.change-password.form.confirm-new-password.placeholder",
    defaultMessage: "Retype Password"
  },
  newRePasswordNotMatch: {
    id: "profile.change-password.form.confirm-new-password.not-match",
    defaultMessage: "Confirm New Password does not match with New Password."
  },
  newRePasswordRequired: {
    id: "profile.change-password.form.confirm-new-password.required",
    defaultMessage: "Confirm New Password is required."
  }
});

class ChangePasswordForm extends React.Component {
  Schema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, this.props.intl.formatMessage(messages.oldPasswordMin))
      .max(30, this.props.intl.formatMessage(messages.oldPasswordMax))
      .required(this.props.intl.formatMessage(messages.oldPasswordRequired)),
    newPassword: Yup.string()
      .min(6, this.props.intl.formatMessage(messages.newPasswordMin))
      .max(30, this.props.intl.formatMessage(messages.newPasswordMax))
      .required(this.props.intl.formatMessage(messages.newPasswordRequired)),
    newRePassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        this.props.intl.formatMessage(messages.newRePasswordNotMatch)
      )
      .required(this.props.intl.formatMessage(messages.newRePasswordRequired))
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newRePassword: ""
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
                    id="profile.change-password.form.old-password"
                    defaultMessage="Old Password"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="oldPassword"
                    className="input"
                    type="password"
                    placeholder={this.props.intl.formatMessage(
                      messages.oldPasswordPlaceHolder
                    )}
                  />
                </div>
                {errors.oldPassword && touched.oldPassword ? (
                  <p className="help is-danger">{errors.oldPassword}</p>
                ) : null}
              </div>
              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="profile.change-password.form.new-password"
                    defaultMessage="New Password"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="newPassword"
                    className="input"
                    type="password"
                    placeholder={this.props.intl.formatMessage(
                      messages.newPasswordPlaceHolder
                    )}
                  />
                </div>
                {errors.newPassword && touched.newPassword ? (
                  <p className="help is-danger">{errors.newPassword}</p>
                ) : null}
              </div>

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="profile.change-password.form.confirm-new-password"
                    defaultMessage="Confirm New Password"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="newRePassword"
                    className="input"
                    type="password"
                    placeholder={this.props.intl.formatMessage(
                      messages.newRePasswordPlaceHolder
                    )}
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

export default withIntl(ChangePasswordForm);
