import React, { useEffect } from "react";

import { Download } from "neetoicons";
import { Button } from "neetoui";
import { useHistory } from "react-router-dom";

import reportsApi from "apis/reports";
import handleError from "common/error";
import ShowLoading from "components/Common/ShowLoading";

import ListReports from "./ListReports";

const Reports = () => {
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await reportsApi.list();
      setReports([...response.data.reports]);
      setLoading(false);
      logger.info(response);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const downloadOnClick = async () => {
    try {
      const response = await reportsApi.exportStart();
      history.push(`/report/export/${response.data.job_id}`);
      logger.info(response);
    } catch (error) {
      handleError(error);
    }
  };

  return loading ? (
    <ShowLoading />
  ) : (
    <>
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
    </>
  );
};

export default Reports;
