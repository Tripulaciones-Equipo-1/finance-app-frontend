import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  resetTransactions,
  updateTransaction,
} from "../../redux/transactions/transactionsSlice";
import { categories } from "../../utils/categories";

import Loader from "../loader/Loader";

import "./TransactionEdit.scss";

const TransactionEdit = ({ show, setShow }) => {
  const initialState = {
    category: "Otros",
  };

  const params = useParams();
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { isSuccess, isLoading, message } = useSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    if (!isSuccess) return;
    setFormData(initialState);
    dispatch(resetTransactions());
    setShow(false);
  }, [isSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.category === "") return;

    dispatch(updateTransaction({ transactionId: params.id, formData }));
  };

  const handleCancel = () => {
    setFormData(initialState);
    setShow(false);
  };

  return (
    <>
      {show && (
        <>
          <Loader loading={isLoading} />

          <div className="transaction-edit">
            <div className="transaction-edit__back" />
            <div className="transaction-edit__container">
              <p className="transaction-edit__title">Abrir nueva cuenta</p>
              <p className="transaction-edit__error">{message}</p>
              <form onSubmit={handleSubmit}>
                <div className="transaction-edit__input">
                  <label htmlFor="category">Categoría:</label>
                  <select
                    name="category"
                    id="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ color: categories[formData.category].color }}
                  >
                    {Object.entries(categories).map(([key, value]) => (
                      <option
                        key={key}
                        value={key}
                        style={{ color: value.color }}
                        className="transaction-edit__option"
                      >
                        {key}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transaction-edit__buttons">
                  <button type="submit" className="transaction-edit__button">
                    Aceptar
                  </button>

                  <button
                    type="reset"
                    onClick={handleCancel}
                    className="transaction-edit__button transaction-edit__button--cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TransactionEdit;
