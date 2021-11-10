import React, { useState } from "react";

import { Toastr, Typography } from "neetoui";

import attemptsApi from "apis/attempts";
import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { useAttempts } from "contexts/attempts";
import { setToLocalStorage } from "helpers/storage";

import RegistrationForm from "./Form/RegistrationForm";

import { urlRoot } from "../constants";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [attempts, setAttempts] = useAttempts();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let response;
      try {
        response = await authApi.registration({
          user: { email, first_name: firstName, last_name: lastName },
        });
      } catch (error) {
        if (error?.response?.data?.error === "Email has already been taken") {
          response = await authApi.login({
            login: { email },
          });
        } else {
          throw error;
        }
      }

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
      });
      setAuthHeaders();

      response = await attemptsApi.create({
        attempt_attributes: { quiz_id: attempts.quiz.id },
      });
      setToLocalStorage({
        attemptId: response.data.id,
      });

      logger.info(response);

      setAttempts(old => ({ ...old, id: response.data.id }));
      window.location.href = `${urlRoot(attempts.quiz)}/`;
    } catch (error) {
      logger.error(error);
      Toastr.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <Typography
          className="flex ml-10 mt-12 text-gray-600"
          style="h2"
          weight="medium"
        >{`Welcome to ${attempts.quiz.name} quiz`}</Typography>
      </div>
      <RegistrationForm
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Registration;
