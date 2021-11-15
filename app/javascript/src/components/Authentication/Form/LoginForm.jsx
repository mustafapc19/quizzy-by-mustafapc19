import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

import { FORM_INITIAL_VALUES, FORM_VALIDATION_SCHEMA } from "./constants";

const LoginForm = ({ handleSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={FORM_VALIDATION_SCHEMA}
      >
        {({ isSubmitting }) => (
          <Form className="w-1/4 space-y-4">
            <Input
              label="Email Address*"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
            <Input
              label="Password*"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <Button
              type="submit"
              label="Login"
              size="large"
              style="primary"
              className="mr-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
