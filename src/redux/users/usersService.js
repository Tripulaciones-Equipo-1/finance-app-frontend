import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(`${API_URL}/users/`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const updateUser = async (userId, userData) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.put(`${API_URL}/users/id/${userId}`, userData, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const getAccounts = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(`${API_URL}/users/accounts`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const usersService = {
  getAllUsers,
  updateUser,
  getAccounts,
};

export default usersService;
