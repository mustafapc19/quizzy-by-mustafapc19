import React from "react";

import { Form, Formik } from "formik";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

import quizzesApi from "apis/quizzes";
import { useQuizzes } from "contexts/quizzes";

import { EDIT_QUIZ_VALIDATION } from "./constants";

const EditQuizForm = ({ quiz, setShowEditQuizModal }) => {
  const setQuizzes = useQuizzes()[1];

  return (
    <div>
      <Formik
        initialValues={{ name: quiz.name }}
        validationSchema={EDIT_QUIZ_VALIDATION}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await quizzesApi.update(quiz.id, {
              quiz: { name: values.name },
            });
            logger.info(res.data);

            setQuizzes(old => [
              ...old.map(item => {
                if (item.id === quiz.id) {
                  item.name = values.name;
                }

                return item;
              }),
            ]);

            setSubmitting(false);
            Toastr.success("Quiz updated successfuly");
            setShowEditQuizModal(false);
          } catch (error) {
            Toastr.error("Something went wrong");
            logger.error(error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input type="string" name="name" label="Quiz Name" />
            <Button
              className="m-1"
              type="submit"
              label="Submit"
              disabled={isSubmitting}
            />
            <Button
              className="m-1"
              style="text"
              type="button"
              label="Cancel"
              onClick={() => setShowEditQuizModal(false)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

EditQuizForm.propTypes = {
  quiz: PropTypes.object.isRequired,
  setShowEditQuizModal: PropTypes.func.isRequired,
};

export default EditQuizForm;
