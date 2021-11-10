import axios from "axios";

const create = payload => axios.post("/public/attempts", payload);

const update = ({ id, payload }) =>
  axios.put(`/public/attempts/${id}`, payload);

const show = id => axios.get(`/public/attempts/${id}`);

const attemptsApi = {
  create,
  update,
  show,
};

export default attemptsApi;
