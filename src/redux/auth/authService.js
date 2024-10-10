import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/users`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData);
  if (res.data) {
    sessionStorage.setItem("user", JSON.stringify(res.data.user));
    sessionStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data;
};

const authService = {
  register,
  login,
};

export default authService;
