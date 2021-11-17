import axios from "axios";

const list = () => axios.get("/public/reports/");

const exportStart = () => axios.get("/public/reports/export_start");

const exportStatus = id => axios.get(`/public/reports/export_status/${id}`);

const exportDownload = id => axios.get(`/public/reports/export_download/${id}`);

const reportsApi = {
  list,
  exportStart,
  exportStatus,
  exportDownload,
};

export default reportsApi;
