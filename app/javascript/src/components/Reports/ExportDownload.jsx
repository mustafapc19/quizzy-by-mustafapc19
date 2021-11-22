import React from "react";

import { saveAs } from "file-saver";
import { Button, Typography } from "neetoui";
import { useHistory, useParams } from "react-router-dom";

import reportsApi from "apis/reports";
import handleError from "common/error";

const ExportDownload = () => {
  const { exportId } = useParams();
  const history = useHistory();

  const handleClick = async () => {
    try {
      const response = await reportsApi.exportDownload(exportId);
      saveAs(response.data.url, "export.xls");
      history.replace("/report");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="flex flex-row justify-center pt-64">
      <div>
        <Typography>Report is now ready for download</Typography>
        <div className="flex flex-row justify-center pt-4">
          <Button
            className="flex"
            label="Download report"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ExportDownload;
