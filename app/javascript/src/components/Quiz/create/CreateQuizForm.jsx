import React from "react";

import { Form, Formik } from "formik";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import quizzesApi from "apis/quizzes";
import handleError from "common/error";

import {
  CREATE_QUIZ_FORM_INITIAL_VALUE,
  CREATE_QUIZ_VALIDATION,
} from "./constants";

const CreateQuizForm = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await quizzesApi.create({
        quiz: { name: values.name },
      });
      logger.info(response.data);
      setSubmitting(false);
      Toastr.success("Quiz created successfuly");
      window.location.href = "/";
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={CREATE_QUIZ_FORM_INITIAL_VALUE}
        validationSchema={CREATE_QUIZ_VALIDATION}
        onSubmit={handleSubmit}
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
