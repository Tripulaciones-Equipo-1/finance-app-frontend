import React from "react";
import Topbar from "../../components/topbar/Topbar";

import "./Register.scss";

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="page">
      <Topbar />

      <section className="register">
        <div className="register__container">
          <p className="register__title">Regístrate en la banca Online</p>

          <form onSubmit={handleSubmit} className="register__form">
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              className="register__input"
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="register__input"
            />
            <input
              name="dni"
              type="text"
              placeholder="DNI"
              className="register__input"
            />
            <input
              name="password"
              type="password"
              placeholder="Clave"
              className="register__input"
            />
            <input
              name="password"
              type="password"
              placeholder="Repite Clave"
              className="register__input"
            />

            <button type="submit" className="register__submit">
              Registrarse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
