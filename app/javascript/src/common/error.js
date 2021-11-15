import { Toastr } from "neetoui";

const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";
const handleError = error => {
  logger.error(error);
  Toastr.error(
    Error(error.response?.data?.error || DEFAULT_ERROR_NOTIFICATION)
  );
};

export default handleError;
