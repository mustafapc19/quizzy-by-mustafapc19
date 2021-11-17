import React from "react";

import { PageLoader } from "neetoui";

const ShowLoading = ({ label }) => {
  return (
    <div className="pt-64">
      <PageLoader text={label} />
    </div>
  );
};

export default ShowLoading;
