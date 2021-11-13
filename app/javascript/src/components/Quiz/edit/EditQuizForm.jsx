import React from "react";

import { Form, Formik } from "formik";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

import quizzesApi from "apis/quizzes";
import handleError from "common/error";
import { useQuizzes } from "contexts/quizzes";

import { EDIT_QUIZ_VALIDATION } from "./constants";

const EditQuizForm = ({ quiz, setShowEditQuizModal }) => {
  const [quizzes, setQuizzes] = useQuizzes();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await quizzesApi.update(quiz.id, {
        quiz: { name: values.name },
      });
      logger.info(response.data);

      quizzes[quiz.id].name = values.name;
      setQuizzes({ ...quizzes });

      setSubmitting(false);
      Toastr.success("Quiz updated successfuly");
      setShowEditQuizModal(false);
    } catch (error) {
      handleError(error);
    }
  };

  const closeModal = () => setShowEditQuizModal(false);

  return (
    <div>
      <Formik
        initialValues={{ name: quiz.name }}
        validationSchema={EDIT_QUIZ_VALIDATION}
        onSubmit={handleSubmit}
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
              onClick={closeModal}
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
