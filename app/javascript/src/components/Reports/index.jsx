import React, { useEffect } from "react";

import reportsApi from "apis/reports";

import ListReports from "./ListReports";

const Reports = () => {
  const [reports, setReports] = React.useState([]);

  useEffect(async () => {
    const response = await reportsApi.list();
    setReports([...response.data.reports]);
    logger.info(response);
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      {Object.keys(reports).length === 0 ? (
        <div className="flex items-center justify-center pt-16">
          You have not created any quiz
        </div>
      ) : (
        <div className="py-4">
          <ListReports reports={reports} />
        </div>
      )}
    </div>
  );
};

export default Reports;
