import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const list = () => axios.get("/quizzes");

const show = id => axios.get(`/quizzes/${id}`);

const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);

const destroy = id => axios.delete(`/quizzes/${id}`);

const quizzesApi = {
  create,
  list,
  update,
  destroy,
  show,
};

export default quizzesApi;
