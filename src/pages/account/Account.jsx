import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions, reset } from "../../redux/accounts/accountsSlice";

import AuthZone from "../../guards/AuthZone";
import Topbar from "../../components/topbar/Topbar";
import Loader from "../../components/loader/Loader";
import MonthCard from "../../components/month-card/MonthCard";
import TransactionList from "../../components/transaction-list/TransactionList";
import TransactionForm from "../../components/transaction-form/TransactionFom";
import CreateBtn from "../../components/create-btn/CreateBtn";

import "./Account.scss";

const Account = () => {
  const [show, setShow] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const { data, transactions, isSuccess, isLoading } = useSelector(
    (state) => state.accounts,
  );

  const [showData, setShowData] = useState(false);
  const [orderedTransactions, setOrderedTransactions] = useState({});
  const [currentTransactions, setCurrentTransactions] = useState({
    income: [],
    costs: [],
  });

  const valuesMonth = () => {
    let res = {};
    transactions.forEach((trans) => {
      // createdAt: "2024-10-12T09:58:41.285Z"
      const { value, date } = trans;
      let [year, month] = date.split(/[-T:. ]/);

      if (!res[year]) res[year] = {};
      if (!res[year][month]) {
        res[year][month] = {};
        res[year][month].income = [];
        res[year][month].costs = [];
      }

      if (value > 0) res[year][month].income.push(trans);
      else res[year][month].costs.push(trans);
    });

    return res;
  };

  const handleClick = (data) => {
    setCurrentTransactions(data);
    setShowData(true);
  };

  useEffect(() => {
    dispatch(getTransactions(params.id));
  }, []);

  useEffect(() => {
    if (!isSuccess) return;

    dispatch(reset());
    setOrderedTransactions(valuesMonth());
  }, [isSuccess]);

  return (
    <AuthZone>
      <Loader loading={isLoading} />

      <TransactionForm show={show} setShow={setShow} />

      <TransactionList
        show={showData}
        setShow={setShowData}
        transactions={currentTransactions}
      />

      <Topbar path={"/accounts"} />

      <section className="account">
        <div className="account__details">
          <p className="account__section">Información general</p>
          <div className="account__data">
            <p className="account__data-name">Nº cuenta</p>
            <p>{data._id}</p>
          </div>
          <div className="account__data">
            <p className="account__data-name">Alias</p>
            <p>{data.alias}</p>
          </div>
          <div className="account__data">
            <p className="account__data-name">Saldo</p>
            <p>{data.balance}€</p>
          </div>
          <div className="account__data">
            <p className="account__data-name">Titular</p>
            <p>{data.owner && data.owner.name}</p>
          </div>
        </div>

        {Object.keys(orderedTransactions)
          .reverse()
          .map((year) => {
            return (
              <div key={year} className="account__block">
                <p className="account__year">{year}</p>
                <div className="account__months">
                  {Object.keys(orderedTransactions[year]).map((month) => (
                    <MonthCard
                      key={`${month}-${year}`}
                      year={year}
                      month={month}
                      data={orderedTransactions[year][month]}
                      handleClick={handleClick}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </section>

      <CreateBtn setShow={setShow} />
    </AuthZone>
  );
};

export default Account;
