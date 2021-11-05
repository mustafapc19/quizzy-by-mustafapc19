import React, { useState } from "react";

import { Form, Formik } from "formik";
import { Button, Dropdown, Toastr, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useHistory, useLocation } from "react-router-dom";

import questionsApi from "apis/questions";

import { CREATE_QUESTION_FORM_INITIAL_VALUE } from "./constant";

const CreateQuestion = () => {
  const { quiz } = useLocation().state;
  const [options, setOptions] = useState(["", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  let history = useHistory();

  return (
    <div>
      <Typography>{`${quiz.name} quiz`}</Typography>
      <Formik
        initialValues={CREATE_QUESTION_FORM_INITIAL_VALUE}
        validate={values => {
          const errors = {};
          if (!values.name.trim()) {
            errors.name = "Required";
          }
          options.forEach((option, index) => {
            if (!option.trim()) {
              errors[`option-${index}`] = "Required";
            }
          });

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await questionsApi.create({
              quizzes_id: quiz.id,
              payload: {
                question: {
                  name: values.name,
                  options: options.map((option, index) => ({
                    name: option,
                    correct: index === correctOptionIndex,
                  })),
                },
              },
            });
            setSubmitting(false);
            Toastr.success("Question created successfuly");
            history.goBack();
            // window.location.href = "/";
          } catch (error) {
            Toastr.error("Something went wrong");
            logger.error(error);
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
                    value={option}
                    onChange={e => {
                      options[index] = e.target.value;
                      setOptions([...options]);
                    }}
                    className="w-1/3"
                    name={`option-${index}`}
                    label={`Option ${index + 1}`}
                  />
                  <Button
                    type="button"
                    style="text"
                    label="remove"
                    onClick={() => {
                      setOptions(
                        options.filter(
                          (_, oldOptionIndex) => oldOptionIndex !== index
                        )
                      );
                    }}
                  />
                </div>
              );
            })}
            <Button
              type="button"
              style="text"
              label="Add option"
              onClick={() => setOptions(old => [...old, ""])}
            />
            <Dropdown buttonStyle="text" label={`Option ${correctOptionIndex}`}>
              {options.map((_, index) => (
                <li
                  key={index}
                  onClick={() => setCorrectOptionIndex(index)}
                >{`Option ${index}`}</li>
              ))}
            </Dropdown>
            <Button type="submit" label="Submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuestion;
