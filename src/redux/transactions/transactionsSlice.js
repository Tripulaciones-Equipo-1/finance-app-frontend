import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionsService from "./transactionsService";

const initialState = {
  latest: [],
  transaction: {},
  transactions: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createTransactions = createAsyncThunk(
  "transactions/create",
  async (transactionData, { rejectWithValue }) => {
    try {
      return await transactionsService.createTransactions(transactionData);
    } catch (error) {
      console.error("Create transaction error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async (transactionData, { rejectWithValue }) => {
    try {
      return await transactionsService.updateTransaction(transactionData);
    } catch (error) {
      console.error("Create transaction error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getLatest = createAsyncThunk(
  "transactions/getLatest",
  async (thunkAPI) => {
    try {
      return await transactionsService.getLatest();
    } catch (error) {
      console.error("Get latest transactions error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getById = createAsyncThunk(
  "transactions/getById",
  async (transactionId, thunkAPI) => {
    try {
      return await transactionsService.getById(transactionId);
    } catch (error) {
      console.error("Get latest transactions error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetTransactions: (state) => {
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
        state.transaction = action.payload.transaction;
        state.isSuccess = true;
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.transaction = action.payload;
        state.isSuccess = true;
      })
      .addCase(getLatest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLatest.fulfilled, (state, action) => {
        state.latest = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.transaction = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      });
  },
});

export const { resetTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
