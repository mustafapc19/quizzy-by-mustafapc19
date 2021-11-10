import axios from "axios";

const login = payload => axios.post("/sessions", payload);

const logout = () => axios.delete("/sessions");

const registration = payload => axios.post("/users", payload);

const authApi = {
  login,
  logout,
  registration,
};

export default authApi;
