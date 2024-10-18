import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, reset } from "../../redux/users/usersSlice";
import {
  getLatest,
  resetTransactions,
} from "../../redux/transactions1/transactionsSlice";

import AuthZone from "../../guards/AuthZone";
import Topbar from "../../components/topbar/Topbar";
import AccountForm from "../../components/account-form/AccountForm";
import CreateBtn from "../../components/create-btn/CreateBtn";
import Loader from "../../components/loader/Loader";
import Transaction from "../../components/transaction/Transaction";

import "./Accounts.scss";

const Accounts = () => {
  const [show, setShow] = useState(false);

  const { accounts, isSuccess, isLoading } = useSelector(
    (state) => state.users,
  );
  const { latest } = useSelector((state) => state.transactions);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAccounts());
    dispatch(getLatest());
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    dispatch(resetTransactions());
  }, [isSuccess]);

  return (
    <AuthZone>
      <Loader loading={isLoading} />

      <AccountForm show={show} setShow={setShow} />

      <Topbar />

      <section className="accounts">
        <p className="accounts__title">Resumen</p>

        <div>
          <p className="accounts__section">Cuentas</p>
          <div>
            {accounts.map((acc) => (
              <div
                onClick={() => navigate(`/account/${acc._id}`)}
                key={acc._id}
                className="accounts__data"
              >
                <div>
                  <p className="accounts__alias">{acc.alias}</p>
                  <p className="accounts__id">{acc._id}</p>
                </div>
                <p className="accounts__balance">
                  {acc.balance.toLocaleString("en", { useGrouping: true })}€
                </p>
              </div>
            ))}
          </div>
        </div>

        {latest && (
          <div className="accounts__latest">
            <p className="accounts__section">Ultimas transacciones</p>

            {latest.map((trans) => (
              <Transaction key={trans._id} {...trans} />
            ))}
          </div>
        )}
      </section>

      <CreateBtn setShow={setShow} />
    </AuthZone>
  );
};

export default Accounts;
