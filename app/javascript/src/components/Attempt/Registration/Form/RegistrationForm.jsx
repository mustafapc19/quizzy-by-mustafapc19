import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

import { FORM_INITIAL_VALUES, FORM_VALIDATION_SCHEMA } from "./constants";

const RegistrationForm = ({ handleSubmit }) => {
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
              label="Email"
              type="email"
              name="email"
              placeholder="eve@example.com"
            />
            <Input
              label="First Name"
              type="string"
              name="firstName"
              placeholder="Eve"
            />
            <Input
              label="Last Name"
              type="string"
              name="lastName"
              placeholder="Smith"
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

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
