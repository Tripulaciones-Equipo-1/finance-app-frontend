import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountsService from "./accountsService";

const initialState = {
  account: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createAccount = createAsyncThunk(
  "accounts/create",
  async (accountData, { rejectWithValue }) => {
    try {
      return await accountsService.createAccount(accountData);
    } catch (error) {
      console.error("Register error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const accountsSlice = createSlice({
  name: "accounts",
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
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        console.log(action.payload);
        state.account = action.payload.account;
        state.isSuccess = true;
      })
      .addCase(createAccount.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
        state.isLoading = false;
        state.message = "El correo o DNI ya ha sido utilizado.";
      });
  },
});

export const { reset } = accountsSlice.actions;

export default accountsSlice.reducer;
