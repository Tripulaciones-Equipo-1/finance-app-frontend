import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, reset } from "../../redux/accounts/accountsSlice";
import { getAccounts } from "../../redux/users/usersSlice";

import Loader from "../loader/Loader";

import "./AccountForm.scss";

const AccountForm = ({ show, setShow }) => {
  const initialState = {
    alias: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const { isSuccess, isLoading, message } = useSelector(
    (state) => state.accounts,
  );

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    dispatch(getAccounts());
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
    if (formData.alias === "") return;
    dispatch(createAccount(formData));
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <>
          <Loader loading={isLoading} />

          <div className="account-form">
            <div className="account-form__back" />
            <div className="account-form__container">
              <p className="account-form__title">Abrir nueva cuenta</p>
              <p className="account-form__error">{message}</p>
              <form onSubmit={handleSubmit}>
                <div className="account-form__input">
                  <label htmlFor="alias">Alias:</label>
                  <input
                    name="alias"
                    id="alias"
                    type="text"
                    value={formData.alias}
                    onChange={handleChange}
                  />
                </div>

                <div className="account-form__buttons">
                  <button type="submit" className="account-form__button">
                    Aceptar
                  </button>
                  <button
                    type="reset"
                    onClick={handleCancel}
                    className="account-form__button account-form__button--cancel"
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

export default AccountForm;
