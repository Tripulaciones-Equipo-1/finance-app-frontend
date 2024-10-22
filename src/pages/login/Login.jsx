import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Loader from "../../components/loader/Loader";
import "./Login.scss";

const Login = () => {
  const initialState = {
    dni: "",
    password: "",
    repeat: "",
  };
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    user && user.role === "admin"
      ? navigate("/admin/users")
      : navigate("/accounts");
  }, [isSuccess]);

  // HANDLERS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dni" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  return (
    <>
      <Loader loading={isLoading} />

      <div className="page">
        <Topbar path={"/"} />

        <section className="login">
          <div className="login__container">
            <p className="login__title">Acceso a banca móvil</p>

            <p className="login__error">{message}</p>

            <form onSubmit={handleSubmit} className="login__form">
              <div>
                <input
                  name="dni"
                  type="text"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={handleChange}
                  className="login__input"
                />
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Clave"
                  value={formData.password}
                  onChange={handleChange}
                  className="login__input"
                />
              </div>
              <button type="submit" className="login__submit">
                Entrar
              </button>
            </form>

            <p className="login__link">
              <a href="/register">No tengo cuenta</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
