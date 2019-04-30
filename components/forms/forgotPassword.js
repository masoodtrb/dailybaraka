import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import withIntl from "../../hoc/withIntl";

const messages = defineMessages({
  emailPlaceholder: {
    id: "forgot-password.form.email.placeHolder",
    defaultMessage: "Your Email"
  },
  emailValidation: {
    id: "forgot-password.form.email.validation",
    defaultMessage: "Email is invalid."
  },
  emailRequiredValidation: {
    id: "forgot-password.form.email.required",
    defaultMessage: "Email is required."
  }
});

class SignUpForm extends React.Component {
  Schema = Yup.object().shape({
    email: Yup.string()
      .email(this.props.intl.formatMessage(messages.emailValidation))
      .required(this.props.intl.formatMessage(messages.emailRequiredValidation))
  });

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: ""
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
                    id="forgot-password.form.email"
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

export default withIntl(SignUpForm);
