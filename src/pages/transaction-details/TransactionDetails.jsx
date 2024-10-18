import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getById,
  resetTransactions,
} from "../../redux/transactions1/transactionsSlice";

import AuthZone from "../../guards/AuthZone";
import Loader from "../../components/loader/Loader";
import Topbar from "../../components/topbar/Topbar";

import "./TransactionsDetails.scss";

const TransactionDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading } = useSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    dispatch(getById(params.id));
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(resetTransactions());
    console.log(data);
  }, [isSuccess]);

  return (
    <AuthZone>
      <Loader loading={isLoading} />

      <Topbar path={data && `/account/${data.account}`} />

      {data && (
        <section className="transaction-details">
          <p className="transaction-details__section">
            Información de transacción
          </p>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Cuenta</p>
            <p>{data.account}</p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Fecha y hora</p>
            <p>{data.date}</p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Concepto</p>
            <p>{data.concept}</p>
          </div>

          <div className="transaction-details__data">
            <p className="transaction-details__data-name">Importe</p>
            <p
              className={
                data.value > 0
                  ? "transaction-details__positive"
                  : "transaction-details__negative"
              }
            >
              {data.value}€
            </p>
          </div>
        </section>
      )}
    </AuthZone>
  );
};

export default TransactionDetails;
