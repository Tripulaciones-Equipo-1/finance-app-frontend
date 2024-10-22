import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
  resetTransactions,
} from "../../redux/transactions/transactionsSlice";
import { categories } from "../../utils/categories";

import AuthZone from "../../guards/AuthZone";
import Loader from "../../components/loader/Loader";
import Topbar from "../../components/topbar/Topbar";

import "./TransactionsDetails.scss";
import TransactionEdit from "../../components/transaction-edit/TransactionEdit";

const TransactionDetails = () => {
  const [show, setShow] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const { transaction, isSuccess, isLoading } = useSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    dispatch(getById(params.id));
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(resetTransactions());
  }, [isSuccess]);

  return (
    <AuthZone>
      <Loader loading={isLoading} />

      <TransactionEdit show={show} setShow={setShow} />

      <Topbar path={transaction && `/account/${transaction.account}`} />

      {transaction && (
        <section className="transaction-details">
          <p className="transaction-details__section">
            Información de transacción
          </p>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Cuenta</p>
            <p>{transaction.account}</p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Fecha y hora</p>
            <p>{transaction.date}</p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Concepto</p>
            <p>{transaction.concept}</p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Categoría</p>
            <p
              style={{
                fontWeight: "bold",
                color: categories[transaction.category]
                  ? categories[transaction.category].color
                  : categories["Otros"].color,
              }}
            >
              {transaction.category}
            </p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Importe</p>
            <p
              className={
                transaction.value > 0
                  ? "transaction-details__positive"
                  : "transaction-details__negative"
              }
            >
              {transaction.value &&
                transaction.value.toLocaleString("es", {
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              €
            </p>
          </div>

          <div className="transaction-details__buttons">
            <button
              onClick={() => setShow(true)}
              className="transaction-details__button"
            >
              Actualizar categoría
            </button>
          </div>
        </section>
      )}
    </AuthZone>
  );
};

export default TransactionDetails;
