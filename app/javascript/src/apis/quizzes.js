import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const list = () => axios.get("/quizzes");

const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);

const destroy = id => axios.delete(`/quizzes/${id}`);

const quizzesApi = {
  create,
  list,
  update,
  destroy,
};

export default quizzesApi;
