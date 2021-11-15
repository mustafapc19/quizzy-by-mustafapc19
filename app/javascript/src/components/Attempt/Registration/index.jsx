import React from "react";

import { Typography } from "neetoui";

import attemptsApi from "apis/attempts";
import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import handleError from "common/error";
import { useAttempt } from "contexts/attempt";
import { setToLocalStorage } from "helpers/storage";

import RegistrationForm from "./Form/RegistrationForm";

import { urlRoot } from "../constants";

const Registration = () => {
  const [attempt, setAttempt] = useAttempt();

  const handleSubmit = async values => {
    try {
      let response;
      try {
        response = await authApi.registration({
          user: {
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
          },
        });
      } catch (error) {
        if (error?.response?.data?.error === "Email has already been taken") {
          response = await authApi.login({
            login: { email: values.email },
          });
        } else {
          throw error;
        }
      }

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email,
        role: response.data.role,
      });
      setAuthHeaders();

      response = await attemptsApi.create({
        attempt_attributes: { quiz_id: attempt.quiz.id },
      });
      setToLocalStorage({
        attemptId: response.data.id,
      });

      logger.info(response);

      setAttempt(old => ({ ...old, id: response.data.id }));
      window.location.href = `${urlRoot(attempt.quiz)}/`;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="ml-10 mt-12">
      <div className="flex flex-row justify-between">
        <Typography
          className="flex  text-gray-600"
          style="h2"
          weight="medium"
        >{`Welcome to ${attempt.quiz.name} quiz`}</Typography>
      </div>
      <div className="pt-4 px-1">
        <RegistrationForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Registration;
