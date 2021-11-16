import React from "react";

import { saveAs } from "file-saver";
import { Button, Typography } from "neetoui";
import { useParams } from "react-router-dom";

import handleError from "common/error";

import reportsApi from "../../apis/reports";

const ExportDownload = () => {
  const { exportId } = useParams();

  const handleClick = async () => {
    try {
      const response = await reportsApi.exportDownload(exportId);
      // saveAs(response.data.file_path, "export.xls");
      logger.info(response.data);
      const blob = new Blob([...response.data], {
        type: "application/xlsx; charset=utf-8",
      });
      saveAs(blob, "export.xls");
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
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ExportDownload;
