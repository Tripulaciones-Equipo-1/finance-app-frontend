import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import users from "./users/usersSlice";
import accounts from "./accounts/accountsSlice";

export const store = configureStore({
  reducer: { auth, users, accounts },
});
