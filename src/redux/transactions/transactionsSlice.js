import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionsService from "./transactionsService";

const initialState = {
  transaction: {},
  transactions: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createTransactions = createAsyncThunk(
  "transction/create",
  async (transactionData, { rejectWithValue }) => {
    try {
      return await transactionsService.createTransactions(transactionData);
    } catch (error) {
      console.error("Create transaction error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        console.log(action.payload);
        state.account = action.payload.account;
        state.isSuccess = true;
      });
  },
});

export const { reset } = transactionsSlice.actions;

export default transactionsSlice.reducer;
