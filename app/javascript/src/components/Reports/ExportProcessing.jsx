import React, { useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import reportsApi from "apis/reports";
import handleError from "common/error";
import ShowLoading from "components/Common/ShowLoading";

const ExportProcessing = () => {
  const { exportId } = useParams();
  const history = useHistory();

  const checkIfDownloadComplete = async () => {
    try {
      const response = await reportsApi.exportStatus(exportId);
      if (response.data.status === "complete") {
        history.replace(`/report/download/${exportId}`);
      } else {
        setTimeout(checkIfDownloadComplete, 300);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(checkIfDownloadComplete, []);

  return (
    <div>
      <ShowLoading label="Your report is being prepared for downloading" />
    </div>
  );
};

export default ExportProcessing;
