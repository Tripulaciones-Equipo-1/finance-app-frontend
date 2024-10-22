import { useEffect, useState } from "react";
import arrowIcon from "../../assets/icons/arrow-left.svg";

import Transaction from "../transaction/Transaction";
import GraphicDoughtnut from "../GraphicDoughtnut/GraphicDoughnut";

import "./TransactionList.scss";

const TransactionList = ({ show, setShow, transactions }) => {
  const { income, costs } = transactions;
  const [showCosts, setShowCosts] = useState(true);

  const [incomeTotal, setIncomeTotal] = useState(0);
  const [costsTotal, setCostsTotal] = useState(0);

  useEffect(() => {
    setShowCosts(costs.length > 0 ? true : false);
    setIncomeTotal(income.reduce((acc, trans) => acc + trans.value, 0));
    setCostsTotal(costs.reduce((acc, trans) => acc + trans.value, 0));
  }, [income, costs]);

  const onClose = () => {
    setShowCosts(true);
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="transaction-list">
          <div className="transaction-list__topbar">
            <img onClick={onClose} src={arrowIcon} alt="go back button" />
          </div>

          <div className="transaction-list__data">
            <p>
              Ingresos:{" "}
              <span className="transaction-list__income">
                {incomeTotal.toLocaleString("es", {
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </span>
            </p>
            <p>
              Gastos:{" "}
              <span className="transaction-list__costs">
                {costsTotal.toLocaleString("es", {
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </span>
            </p>
          </div>

          {costs.length > 0 && <GraphicDoughtnut transactionsList={costs} />}

          <div className="transaction-list__buttons">
            <div
              onClick={() => setShowCosts(false)}
              className={`transaction-list__button ${
                !showCosts && "transaction-list__button--highlight"
              }`}
            >
              Ingresos
            </div>

            <div
              onClick={() => setShowCosts(true)}
              className={`transaction-list__button ${
                showCosts && "transaction-list__button--highlight"
              }`}
            >
              Gastos
            </div>
          </div>

          {showCosts
            ? costs.map((trans) => <Transaction key={trans._id} {...trans} />)
            : income.map((trans) => <Transaction key={trans._id} {...trans} />)}
        </div>
      )}
    </>
  );
};

export default TransactionList;
