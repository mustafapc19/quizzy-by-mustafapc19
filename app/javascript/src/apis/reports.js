import axios from "axios";

const list = () => axios.get("/public/reports/");

const reportsApi = {
  list,
};

export default reportsApi;
