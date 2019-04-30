import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import withIntl from "../../hoc/withIntl";
import { FormattedMessage, defineMessages } from "react-intl";

const messages = defineMessages({
  firstNamePlaceholder: {
    id: "register.form.first-name.placeHolder",
    defaultMessage: "First Name"
  },
  firstNameMinValidation: {
    id: "register.form.first-name.min",
    defaultMessage: "First Name is too short."
  },
  firstNameMaxValidation: {
    id: "register.form.first-name.max",
    defaultMessage: "First Name is too large."
  },
  firstNameRequiredValidation: {
    id: "register.form.first-name.required",
    defaultMessage: "First Name is required."
  },

  lastNamePlaceholder: {
    id: "register.form.last-name.placeHolder",
    defaultMessage: "Last Name"
  },
  lastNameMinValidation: {
    id: "register.form.last-name.min",
    defaultMessage: "Last Name is too short."
  },
  lastNameMaxValidation: {
    id: "register.form.last-name.max",
    defaultMessage: "Last Name is too large."
  },
  lastNameRequiredValidation: {
    id: "register.form.last-name.required",
    defaultMessage: "Last Name is required."
  },

  phonePlaceholder: {
    id: "register.form.phone.placeHolder",
    defaultMessage: "Phone Number"
  },
  phoneMinValidation: {
    id: "register.form.phone.min",
    defaultMessage: "Phone Number is too short."
  },
  phoneMaxValidation: {
    id: "register.form.phone.max",
    defaultMessage: "Phone Number is too large."
  },
  phoneRequiredValidation: {
    id: "register.form.phone.required",
    defaultMessage: "Phone Number is required."
  },

  emailPlaceholder: {
    id: "register.form.email.placeHolder",
    defaultMessage: "Email"
  },
  emailValidation: {
    id: "register.form.email.validation",
    defaultMessage: "Email is invalid."
  },
  emailRequiredValidation: {
    id: "register.form.email.required",
    defaultMessage: "Email is required."
  },

  passwordPlaceholder: {
    id: "register.form.password.placeholder",
    defaultMessage: "Password"
  },
  passwordMinValidation: {
    id: "register.form.password.min",
    defaultMessage: "Password is too short."
  },
  passwordMaxValidation: {
    id: "register.form.password.max",
    defaultMessage: "Password is too large."
  },
  passwordRequiredValidation: {
    id: "register.form.password.required",
    defaultMessage: "Password is required."
  },

  rePasswordPlaceholder: {
    id: "register.form.confirm-password.placeholder",
    defaultMessage: "Retype Password"
  },
  rePasswordNotMatch: {
    id: "register.form.confirm-password.not-match",
    defaultMessage: "Confirm Password does not match with Password."
  },
  rePasswordRequired: {
    id: "register.form.confirm-password.required",
    defaultMessage: "Confirm Password is required."
  }
});

class SignUpForm extends React.Component {
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
      ),
    phone: Yup.string()
      .min(4, this.props.intl.formatMessage(messages.phoneMinValidation))
      .max(50, this.props.intl.formatMessage(messages.phoneMaxValidation)),
    email: Yup.string()
      .email(this.props.intl.formatMessage(messages.emailValidation))
      .required(
        this.props.intl.formatMessage(messages.emailRequiredValidation)
      ),
    password: Yup.string()
      .min(6, this.props.intl.formatMessage(messages.passwordMinValidation))
      .max(30, this.props.intl.formatMessage(messages.passwordMaxValidation))
      .required(
        this.props.intl.formatMessage(messages.passwordRequiredValidation)
      ),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        this.props.intl.formatMessage(messages.rePasswordNotMatch)
      )
      .required(messages.rePasswordRequired)
  });

  render() {
    return (
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
                    id="register.form.first-name"
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
                    id="register.form.last-name"
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
                <label className="label">
                  <FormattedMessage
                    id="register.form.email"
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
                    id="register.form.phone"
                    defaultMessage="Phone Number"
                  />
                </label>
                <div className="control">
                  <Field
                    name="phone"
                    className="input"
                    type="text"
                    placeholder={this.props.intl.formatMessage(
                      messages.phonePlaceholder
                    )}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="register.form.password"
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

              <div className="field">
                <label className="label">
                  <FormattedMessage
                    id="register.form.confirm-password"
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
                      messages.rePasswordPlaceholder
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
                      id="register.form.submit"
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

export default withIntl(SignUpForm);
