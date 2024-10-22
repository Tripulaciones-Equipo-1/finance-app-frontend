import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userStorage = JSON.parse(localStorage.getItem("user"));
const tokenStorage = JSON.parse(localStorage.getItem("token"));

const initialState = {
  user: userStorage || null,
  token: tokenStorage || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      console.error("Register error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      console.error("Login error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.logout(userData);
    } catch (error) {
      console.error("Logout error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
        state.isLoading = false;
        state.message = "El correo o DNI ya ha sido utilizado.";
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.isError = true;
        state.isLoading = false;
        state.message = "El DNI o contraseña son incorrectos.";
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isSuccess = true;
        state.isLoading = false;
        localStorage.clear();
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
