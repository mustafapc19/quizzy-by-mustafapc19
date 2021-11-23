import React from "react";

import { Typography } from "neetoui";

const NotFound = ({ label }) => {
  return (
    <div className="pt-64 flex justify-center">
      <Typography style="h2">{label}</Typography>
    </div>
  );
};

export default NotFound;
