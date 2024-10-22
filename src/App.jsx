import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Accounts from "./pages/accounts/Accounts";
import Account from "./pages/account/Account";
import TransactionDetails from "./pages/transaction-details/TransactionDetails";
import AdminUsers from "./pages/admin/users/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/account/:id" element={<Account />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
