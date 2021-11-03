import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import {
  CREATE_QUIZ_FORM_INITIAL_VALUE,
  CREATE_QUIZ_VALIDATION,
} from "./constants";

const CreateQuizForm = () => {
  return (
    <div>
      <Formik
        initialValues={CREATE_QUIZ_FORM_INITIAL_VALUE}
        // validate={(values) =>
        //   values.name.trim().length === 0 ? {} : { 'name': 'Name cannot be blank' }
        // }
        validationSchema={CREATE_QUIZ_VALIDATION}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            // window.location.href = "/";
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input
              type="string"
              className="w-1/3"
              name="name"
              label="Quiz Name"
            />
            <Button type="submit" label="Submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuizForm;
