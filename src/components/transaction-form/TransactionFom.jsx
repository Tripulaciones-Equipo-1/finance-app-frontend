import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransactions, reset } from "../../redux/accounts/accountsSlice";

import Loader from "../loader/Loader";

import "./TransactionForm.scss";

const TransactionFom = ({ show, setShow }) => {
  const initialState = {
    concept: "",
    value: "",
    category: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const { isSuccess, isLoading, message } = useSelector(
    (state) => state.accounts,
  );

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    dispatch(createTransactions());
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
    if (
      (formData.concept === "", formData.value === "", formData.category === "")
    )
      return;
    dispatch(createTransactions(formData));
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <>
          <Loader loading={isLoading} />

          <div className="transaction-form">
            <div className="transaction-form__back" />
            <div className="transaction-form__container">
              <p className="transaction-form__title">Crear una transacción</p>
              <p className="transaction-form__error">{message}</p>
              <form onSubmit={handleSubmit}>
                <div className="transaction-form__input">
                  <label htmlFor="concept">Concepto:</label>
                  <input
                    name="concept"
                    id="concept"
                    type="text"
                    value={formData.concept}
                    onChange={handleChange}
                  />
                </div>
                <div className="transaction-form__input">
                  <label htmlFor="value">Valor:</label>
                  <input
                    name="value"
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                  />
                   </div>
                {/* </div>
                <div className="transaction-form__input">
                  <label htmlFor="category">Categoria:</label>
                  <input
                    name="category"
                    id="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div> */}

                <div className="transaction-form__buttons">
                  <button type="submit" className="account-form__button">
                    Aceptar
                  </button>
                  <button
                    type="reset"
                    onClick={handleCancel}
                    className="transaction-form__button transaction-form__button--cancel"
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

export default TransactionFom;
