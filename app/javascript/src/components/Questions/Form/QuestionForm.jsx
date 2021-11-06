import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { Button, Dropdown, Toastr, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import questionsApi from "apis/questions";

import { CREATE_QUESTION_FORM_INITIAL_VALUE } from "./constant";

const QuestionForm = ({ quiz, question }) => {
  const [options, setOptions] = useState([{ name: "" }, { name: "" }]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  let history = useHistory();

  useEffect(() => {
    if (question) {
      setOptions(question.options);
      setCorrectOptionIndex(
        question.options.findIndex(option => option.correct)
      );
    }
  }, []);

  const questionToInitialValue = question => {
    const initialValue = {};
    initialValue.name = question.name;
    question.options.forEach((option, index) => {
      initialValue[`option-${index}`] = option;
    });
    return initialValue;
  };

  return (
    <div>
      <Typography>{`${quiz.name} quiz`}</Typography>
      <Formik
        initialValues={
          question
            ? questionToInitialValue(question)
            : CREATE_QUESTION_FORM_INITIAL_VALUE
        }
        validate={values => {
          const errors = {};
          if (!values.name.trim()) {
            errors.name = "Required";
          }
          options.forEach((option, index) => {
            if (!option.name.trim()) {
              errors[`option-${index}`] = "Required";
            }
          });

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (question) {
              await questionsApi.update({
                quiz_id: quiz.id,
                question_id: question.id,
                payload: {
                  question: {
                    name: values.name,
                    options: options.map((option, index) => ({
                      name: option.name,
                      id: option.id,
                      correct: index === correctOptionIndex,
                    })),
                  },
                },
              });
              Toastr.success("Question updated successfully");
            } else {
              await questionsApi.create({
                quiz_id: quiz.id,
                payload: {
                  question: {
                    name: values.name,
                    options: options.map((option, index) => ({
                      name: option.name,
                      correct: index === correctOptionIndex,
                    })),
                  },
                },
              });
              Toastr.success("Question created successfully");
            }
            setSubmitting(false);
            history.goBack();
            // window.location.href = "/";
          } catch (error) {
            Toastr.error(
              error?.response?.data?.error || "Something went wrong"
            );
            logger.error(error.response.data.error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input type="name" className="w-1/3" name="name" label="Question" />
            {options.map((option, index) => {
              return (
                <div key={index}>
                  <Input
                    type="string"
                    value={option.name}
                    onChange={e => {
                      options[index].name = e.target.value;
                      setOptions([...options]);
                    }}
                    className="w-1/3"
                    name={`option-${index}`}
                    label={`Option ${index + 1}`}
                  />
                  {index >= 2 ? (
                    <Button
                      type="button"
                      style="text"
                      label="remove"
                      onClick={() => {
                        if (index == options.length - 1) {
                          setCorrectOptionIndex(index - 1);
                        }
                        setOptions(
                          options.filter(
                            (_, oldOptionIndex) => oldOptionIndex !== index
                          )
                        );
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
            {options.length < 4 ? (
              <Button
                type="button"
                style="text"
                label="Add option"
                onClick={() => setOptions(old => [...old, { name: "" }])}
              />
            ) : (
              <></>
            )}
            <Dropdown
              buttonStyle="text"
              label={`Option ${correctOptionIndex + 1}`}
            >
              {options.map((_, index) => (
                <li
                  key={index}
                  onClick={() => setCorrectOptionIndex(index)}
                >{`Option ${index + 1}`}</li>
              ))}
            </Dropdown>
            <Button type="submit" label="Submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

QuestionForm.propTypes = {
  quiz: PropTypes.object,
  question: PropTypes.object,
};

export default QuestionForm;
