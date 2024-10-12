import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, reset } from "../../redux/users/usersSlice";

import AuthZone from "../../guards/AuthZone";
import Topbar from "../../components/topbar/Topbar";
import AccountForm from "../../components/account-form/AccountForm";
import CreateBtn from "../../components/create-btn/CreateBtn";
import Loader from "../../components/loader/Loader";

import "./Accounts.scss";
import Transaction from "../../components/transaction/Transaction";

const Accounts = () => {
  const [show, setShow] = useState(false);

  const { accounts, isSuccess, isLoading } = useSelector(
    (state) => state.users,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
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
                onClick={() => navigate(`/accounts/${acc._id}`)}
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
      </section>

      <CreateBtn setShow={setShow} />
    </AuthZone>
  );
};

export default Accounts;
