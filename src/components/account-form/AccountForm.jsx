import React from "react";

import "./AccountForm.scss";

const AccountForm = ({ show, setShow }) => {
  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="account-form">
          <div className="account-form__back" />
          <div className="account-form__container">
            <form action="">
              <input type="text" placeholder="Alias" />
            </form>

            <div className="account-form__buttons">
              <button>Aceptar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;
