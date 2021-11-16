import React, { useEffect } from "react";

import { Download } from "neetoicons";
import { Button } from "neetoui";
import { useHistory } from "react-router-dom";

import reportsApi from "apis/reports";

import ListReports from "./ListReports";

const Reports = () => {
  const [reports, setReports] = React.useState([]);
  const history = useHistory();

  useEffect(async () => {
    const response = await reportsApi.list();
    setReports([...response.data.reports]);
    logger.info(response);
  }, []);

  const downloadOnClick = async () => {
    const response = await reportsApi.exportStart();
    history.push(`/reports/export/${response.data.job_id}`);
    logger.info(response);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1>Reports</h1>
        <Button
          label="Download"
          icon={Download}
          iconPosition="left"
          onClick={downloadOnClick}
        />
      </div>
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
