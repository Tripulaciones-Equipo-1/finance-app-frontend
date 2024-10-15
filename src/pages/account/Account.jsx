import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions, reset } from "../../redux/accounts/accountsSlice";

import AuthZone from "../../guards/AuthZone";
import Topbar from "../../components/topbar/Topbar";
import Loader from "../../components/loader/Loader";
import MonthCard from "../../components/month-card/MonthCard";
import TransactionList from "../../components/transaction-list/TransactionList";

import "./Account.scss";

const Account = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { transactions, isSuccess, isLoading } = useSelector(
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

      <TransactionList
        show={showData}
        setShow={setShowData}
        transactions={currentTransactions}
      />

      <Topbar path={"/accounts"} />

      <section>
        {Object.keys(orderedTransactions).map((year) => {
          return (
            <div key={year}>
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
    </AuthZone>
  );
};

export default Account;
