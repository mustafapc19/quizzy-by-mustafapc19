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
    <div className="max-w-md ml-10">
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          required={true}
          placeholder="oliver@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="First Name"
          type="string"
          required={true}
          placeholder="Eve"
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          label="Second Name"
          type="string"
          required={true}
          placeholder="Smith"
          onChange={e => setLastName(e.target.value)}
        />
        <Button type="submit" label="Submit" />
      </form>
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
