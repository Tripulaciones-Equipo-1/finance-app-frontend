import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import accounts from "./accounts/accountsSlice";

export const store = configureStore({
  reducer: { auth, accounts },
});
