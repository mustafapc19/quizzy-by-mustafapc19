import axios from "axios";

const create = ({ quiz_id, payload }) =>
  axios.post(`/quizzes/${quiz_id}/questions`, payload);

const list = ({ quiz_id }) => axios.get(`/quizzes/${quiz_id}/questions`);

const show = ({ quiz_id, question_id }) =>
  axios.get(`/quizzes/${quiz_id}/questions/${question_id}`);

const update = ({ quiz_id, question_id, payload }) =>
  axios.put(`/quizzes/${quiz_id}/questions/${question_id}`, payload);

const destroy = ({ quiz_id, question_id }) =>
  axios.delete(`/quizzes/${quiz_id}/questions/${question_id}`);

const questionsApi = {
  create,
  list,
  update,
  destroy,
  show,
};

export default questionsApi;
