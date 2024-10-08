import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";

import "./Register.scss";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    dni: "",
    password: "",
    repeat: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
              value={formData.name}
              onChange={handleChange}
              className="register__input"
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="register__input"
            />
            <input
              name="dni"
              type="text"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
              className="register__input"
            />
            <input
              name="password"
              type="password"
              placeholder="Clave"
              value={formData.password}
              onChange={handleChange}
              className="register__input"
            />
            <input
              name="repeat"
              type="password"
              placeholder="Repite Clave"
              value={formData.repeat}
              onChange={handleChange}
              className="register__input"
            />

            <button type="submit" className="register__submit">
              Registrarse
            </button>
          </form>

          <p className="register__link">
            <a href="/login">Ya tengo cuenta</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
