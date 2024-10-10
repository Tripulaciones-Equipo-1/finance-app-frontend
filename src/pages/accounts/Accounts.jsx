import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import AccountForm from "../../components/account-form/AccountForm";
import CreateBtn from "../../components/create-btn/CreateBtn";

import "./Accounts.scss";

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

  const [show, setShow] = useState(false);

  return (
    <>
      <AccountForm show={show} setShow={setShow} />

      <Topbar />

      <section className="accounts">
        <p className="accounts__title">Resumen</p>

        <div>
          <p className="accounts__section">Cuentas</p>
          <div>
            {accounts.map((acc) => (
              <div key={acc._id} className="accounts__data">
                <div>
                  <p>{acc.alias}</p>
                  <p className="accounts__id">{acc._id}</p>
                </div>
                <p className="accounts__balance">{acc.balance}€</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CreateBtn setShow={setShow} />
    </>
  );
};

export default Accounts;
