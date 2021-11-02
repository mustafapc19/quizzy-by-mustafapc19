import React from "react";

import { Button, Input } from "bigbinary";
import PropTypes from "prop-types";

const LoginForm = ({ handleSubmit, setEmail, setPassword }) => {
  return (
    <div
      className="flex items-center justify-center
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
          text-center text-bb-gray-700"
        >
          Login
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" label="Submit" />
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
};

export default LoginForm;
