import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthZone from "../../guards/AuthZone";
import Topbar from "../../components/topbar/Topbar";
import AccountForm from "../../components/account-form/AccountForm";
import CreateBtn from "../../components/create-btn/CreateBtn";

import "./Accounts.scss";
import Transaction from "../../components/transaction/Transaction";

const Accounts = () => {
  const accounts = [
    {
      _id: "1111111111111",
      alias: "tarjeta",
      balance: 50000,
    },
    {
      _id: "222222222222",
      alias: "cuenta",
      balance: 10000000,
    },
  ];

  const transactions = [
    {
      _id: "11111111",
      from: "me",
      to: "Bar Pepe",
      value: -300,
      category: "Ocio",
    },
    {
      _id: "22222222",
      from: "me",
      to: "Taller Pepe",
      value: -300,
      category: "Coche",
    },
    {
      _id: "3333333",
      from: "Empresa Pepe",
      to: "me",
      value: 1300,
      category: "Ingreso",
    },
  ];

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  return (
    <AuthZone>
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

      {transactions.map((trans) => (
        <Transaction key={trans._id} {...trans} />
      ))}

      <CreateBtn setShow={setShow} />
    </AuthZone>
  );
};

export default Accounts;
