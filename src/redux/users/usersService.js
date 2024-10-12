import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const getAccounts = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(`${API_URL}/users/accounts`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const accountsService = {
  createAccount,
};

export default accountsService;