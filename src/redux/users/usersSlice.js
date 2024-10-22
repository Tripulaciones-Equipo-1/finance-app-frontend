import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  users: [],
  user: {},
  accounts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async (thunkAPI) => {
    try {
      return await usersService.getAllUsers();
    } catch (error) {
      console.error("Get users error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (userData, thunkAPI) => {
    try {
      const { userId, formData } = userData;
      return await usersService.updateUser(userId, formData);
    } catch (error) {
      console.error("Update user error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId, thunkAPI) => {
    try {
      return await usersService.deleteUser(userId);
    } catch (error) {
      console.error("Update user error: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

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
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
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
