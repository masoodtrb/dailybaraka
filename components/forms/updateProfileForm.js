import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import withIntl from "../../hoc/withIntl";

const messages = defineMessages({
  firstNamePlaceholder: {
    id: "profile.update.form.first-name.placeHolder",
    defaultMessage: "First Name"
  },
  firstNameMinValidation: {
    id: "profile.update.form.first-name.min",
    defaultMessage: "First Name is too short."
  },
  firstNameMaxValidation: {
    id: "profile.update.form.first-name.max",
    defaultMessage: "First Name is too large."
  },
  firstNameRequiredValidation: {
    id: "profile.update.form.first-name.required",
    defaultMessage: "First Name is required."
  },

  lastNamePlaceholder: {
    id: "profile.update.form.last-name.placeHolder",
    defaultMessage: "Last Name"
  },
  lastNameMinValidation: {
    id: "profile.update.form.last-name.min",
    defaultMessage: "Last Name is too short."
  },
  lastNameMaxValidation: {
    id: "profile.update.form.last-name.max",
    defaultMessage: "Last Name is too large."
  },
  lastNameRequiredValidation: {
    id: "profile.update.form.last-name.required",
    defaultMessage: "Last Name is required."
  }
});

class UpdateProfileForm extends React.Component {
  Schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, this.props.intl.formatMessage(messages.firstNameMinValidation))
      .max(50, this.props.intl.formatMessage(messages.firstNameMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.firstNameRequiredValidation)
      ),
    lastName: Yup.string()
      .min(2, this.props.intl.formatMessage(messages.lastNameMinValidation))
      .max(50, this.props.intl.formatMessage(messages.lastNameMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.lastNameRequiredValidation)
      )
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: this.props.defaultValues.firstName,
            lastName: this.props.defaultValues.lastName
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
                    id="profile.update.form.first-name"
                    defaultMessage="First Name"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="firstName"
                    className="input"
                    type="text"
                    placeholder={this.props.intl.formatMessage(
                      messages.firstNamePlaceholder
                    )}
                  />
                </div>
                {errors.firstName && touched.firstName ? (
                  <p className="help is-danger">{errors.firstName}</p>
                ) : null}
              </div>

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="profile.update.form.last-name"
                    defaultMessage="Last Name"
                  />
                  &nbsp;*
                </label>
                <div className="control">
                  <Field
                    name="lastName"
                    className="input"
                    type="text"
                    placeholder={this.props.intl.formatMessage(
                      messages.lastNamePlaceholder
                    )}
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

export default withIntl(UpdateProfileForm);
