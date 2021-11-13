import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { Button, Dropdown, Toastr, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";

import questionsApi from "apis/questions";
import handleError from "common/error";

import { CREATE_QUESTION_FORM_INITIAL_VALUE } from "./constant";

const QuestionForm = ({ quiz, question }) => {
  const editMode = !either(isNil, isEmpty)(question);
  const [options, setOptions] = useState([{ name: "" }, { name: "" }]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  let history = useHistory();

  useEffect(() => {
    if (editMode) {
      setOptions(question.options);
      setCorrectOptionIndex(
        question.options.findIndex(option => option.correct)
      );
    }
  }, []);

  const questionToInitialValue = question => {
    if (editMode) {
      const initialValue = {};
      initialValue.name = question.name;
      question.options.forEach((option, index) => {
        initialValue[`option-${index}`] = option;
      });
      return initialValue;
    }

    return CREATE_QUESTION_FORM_INITIAL_VALUE;
  };

  const buildApiPayload = values => {
    const payload = {
      question: {
        name: values.name,
        options_attributes: options.map((option, index) => ({
          name: option.name,
          id: option.id,
          correct: index === correctOptionIndex,
        })),
      },
    };
    if (editMode) {
      payload.question.options_attributes.push(
        ...question.options
          .filter(
            option => options.findIndex(item => item.id === option.id) === -1
          )
          .map(option => ({
            name: option.name,
            id: option.id,
            correct: false,
            _destroy: true,
          }))
      );
    }

    return payload;
  };

  const onSubmitForm = async (values, { setSubmitting }) => {
    try {
      if (editMode) {
        await questionsApi.update({
          quiz_id: quiz.id,
          question_id: question.id,
          payload: buildApiPayload(values),
        });
        Toastr.success("Question updated successfully");
      } else {
        await questionsApi.create({
          quiz_id: quiz.id,
          payload: buildApiPayload(values),
        });
        Toastr.success("Question created successfully");
      }
      setSubmitting(false);
      history.goBack();
    } catch (error) {
      handleError(error);
    }
  };

  const formValidation = values => {
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
  };

  const onAddOption = () => {
    setOptions(old => [...old, { name: "" }]);
  };

  return (
    <div>
      <Typography>{`${quiz.name} quiz`}</Typography>
      <Formik
        initialValues={questionToInitialValue(question)}
        validate={formValidation}
        onSubmit={onSubmitForm}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input type="name" className="w-1/3" name="name" label="Question" />
            {options.map((option, index) => {
              const optionOnChange = e => {
                options[index].name = e.target.value;
                setOptions([...options]);
              };

              const optionOnRemove = () => {
                if (index == options.length - 1) {
                  setCorrectOptionIndex(index - 1);
                }
                setOptions(
                  options.filter(
                    (_, oldOptionIndex) => oldOptionIndex !== index
                  )
                );
              };

              return (
                <div key={index}>
                  <Input
                    type="string"
                    value={option.name}
                    onChange={optionOnChange}
                    className="w-1/3"
                    name={`option-${index}`}
                    label={`Option ${index + 1}`}
                  />
                  {index >= 2 ? (
                    <Button
                      type="button"
                      style="text"
                      label="remove"
                      onClick={optionOnRemove}
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
                onClick={onAddOption}
              />
            ) : (
              <></>
            )}
            <Dropdown
              buttonStyle="text"
              label={`Option ${correctOptionIndex + 1}`}
            >
              {options.map((_, index) => {
                const setCorrectOptionOnClick = () => {
                  setCorrectOptionIndex(index);
                };

                const optionText = `Option ${index + 1}`;

                return (
                  <li
                    key={index}
                    onClick={setCorrectOptionOnClick}
                  >{`${optionText}`}</li>
                );
              })}
            </Dropdown>
            <Button type="submit" label="Submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuestionForm;
