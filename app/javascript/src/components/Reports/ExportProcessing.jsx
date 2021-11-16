import React, { useEffect } from "react";

import { PageLoader, Typography } from "neetoui";
import { useHistory, useParams } from "react-router-dom";

import reportsApi from "apis/reports";
import handleError from "common/error";

const ExportProcessing = () => {
  const { exportId } = useParams();
  const history = useHistory();

  const checkIfDownloadComplete = async () => {
    try {
      const response = await reportsApi.exportStatus(exportId);
      if (response.data.status === "complete") {
        history.replace(`/reports/download/${exportId}`);
      } else {
        setTimeout(checkIfDownloadComplete, 5000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(checkIfDownloadComplete, []);

  return (
    <div className="flex flex-row justify-center pt-64">
      <div>
        <PageLoader />
        <Typography className="pt-4">
          Your report is being prepared for downloading
        </Typography>
      </div>
    </div>
  );
};

export default ExportProcessing;
