import React from "react";

import authApi from "apis/auth";
import { resetAuthTokens, setAuthHeaders } from "apis/axios";
import handleError from "common/error";
import LoginForm from "components/Authentication/Form/LoginForm";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const handleSubmit = async values => {
    try {
      const response = await authApi.login({
        login: { email: values.email, password: values.password },
      });

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: values.email,
        userId: response.data.id,
        userFirstName: response.data.first_name,
        userLastName: response.data.last_name,
        role: response.data.role,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      resetAuthTokens();
      handleError(error);
    }
  };

  return (
    <div className="px-4 py-4">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
