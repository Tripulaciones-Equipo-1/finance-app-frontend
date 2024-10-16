import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const createAccount = async (accountData) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.post(`${API_URL}/account`, accountData, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const createTransactions = async (transactionId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.post(`${API_URL}/transaction/id/${transactionId}`,{
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const getTransactions = async (accountId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(`${API_URL}/account/transactions/${accountId}`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const accountsService = {
  createAccount,
  createTransactions,
  getTransactions,
};

export default accountsService;
