import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  accounts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAccounts = createAsyncThunk(
  "users/getAccounts",
  async (thunkAPI) => {
    try {
      return await usersService.getAccounts();
    } catch (error) {
      console.error("Get user accounts error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const usersSlice = createSlice({
  name: "users",
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
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload.accounts;
        state.isLoading = false;
        state.isSuccess = true;
      });
  },
});

export const { reset } = usersSlice.actions;

export default usersSlice.reducer;
