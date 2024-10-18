import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import users from "./users/usersSlice";
import accounts from "./accounts/accountsSlice";
import transactions from "./transactions1/transactionsSlice";

export const store = configureStore({
  reducer: { auth, users, accounts, transactions },
});
