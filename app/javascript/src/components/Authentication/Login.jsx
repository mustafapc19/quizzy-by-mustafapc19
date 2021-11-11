import React, { useState } from "react";

import authApi from "apis/auth";
import { resetAuthTokens, setAuthHeaders } from "apis/axios";
import handleError from "common/error";
import LoginForm from "components/Authentication/Form/LoginForm";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });

      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userFirstName: response.data.first_name,
        userLastName: response.data.last_name,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      resetAuthTokens();
      handleError(error);
      setLoading(false);
    }
  };

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
