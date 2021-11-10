import React from "react";

import { Button, Input } from "neetoui";
import PropTypes from "prop-types";

const RegistrationForm = ({
  handleSubmit,
  setEmail,
  setFirstName,
  setLastName,
}) => {
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
          Registration
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="First Name"
            type="string"
            placeholder="Eve"
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Second Name"
            type="string"
            placeholder="Smith"
            onChange={e => setLastName(e.target.value)}
          />
          <Button type="submit" label="Submit" />
        </form>
      </div>
    </div>
  );
};

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
};

export default RegistrationForm;
