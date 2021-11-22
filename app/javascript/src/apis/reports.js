import axios from "axios";

const list = () => axios.get("/reports/");

const exportStart = () => axios.get("/reports/export_start");

const exportStatus = id => axios.get(`/reports/export_status/${id}`);

const exportDownload = id => axios.get(`/reports/export_download/${id}`);

const reportsApi = {
  list,
  exportStart,
  exportStatus,
  exportDownload,
};

export default reportsApi;
