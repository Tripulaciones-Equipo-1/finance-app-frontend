import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const register = async (userData) => {
  console.log(userData);
  return;
  const res = await axios.post(`${API_URL}/users`, userData);
  return res.data;
};

const authService = {
  register,
};

export default authService;
