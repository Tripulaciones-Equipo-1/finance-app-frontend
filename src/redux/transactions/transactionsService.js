import axios from "axios";

const env = import.meta.env;
const API_URL = env.VITE_API_URL || "http://localhost:3000";

const createTransactions = async (transactionData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const { accountId, formData } = transactionData;

  console.log(transactionData);

  const res = await axios.post(
    `${API_URL}/transaction/id/${accountId}`,
    formData,
    {
      headers: {
        authorization: token,
      },
    },
  );

  return res.data;
};

const getLatest = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(`${API_URL}/transaction/latest`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const getById = async (transactionId) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await axios.get(`${API_URL}/transaction/trans/${transactionId}`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

const transactionsService = {
  createTransactions,
  getLatest,
  getById,
};

export default transactionsService;
