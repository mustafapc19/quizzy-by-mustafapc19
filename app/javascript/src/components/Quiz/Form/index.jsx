import React from "react";

import { Form, Formik } from "formik";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import handleError from "common/error";

import { FORM_INITIAL_VALUE, FORM_VALIDATION } from "./constants";

const QuizForm = ({ quiz }) => {
  const editMode = !either(isNil, isEmpty)(quiz);
  const history = useHistory();

  const callUpdateQuizApi = async values => {
    const response = await quizzesApi.update(quiz.id, {
      quiz: { name: values.name },
    });
    logger.info(response.data);

    Toastr.success("Quiz updated successfuly");
  };

  const callCreateQuizApi = async values => {
    const response = await quizzesApi.create({
      quiz: { name: values.name },
    });
    logger.info(response.data);

    Toastr.success("Quiz created successfuly");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editMode) {
        await callUpdateQuizApi(values);
      } else {
        await callCreateQuizApi(values);
      }

      setSubmitting(false);
      history.push("/");
    } catch (error) {
      handleError(error);
    }
  };

  const initialValues = editMode ? { name: quiz.name } : FORM_INITIAL_VALUE;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={FORM_VALIDATION}
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

export default QuizForm;
