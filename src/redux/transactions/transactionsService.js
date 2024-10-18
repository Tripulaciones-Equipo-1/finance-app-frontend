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

const transactionsService = {
  createTransactions,
};

export default transactionsService;
