import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../redux/auth/authSlice";
import { validDNI } from "../../utils/validations";

import Topbar from "../../components/topbar/Topbar";
import Loader from "../../components/loader/Loader";

import "./Register.scss";

// Ref: https://stackoverflow.com/questions/5658899/can-anyone-tell-me-the-regex-for-excluding-numbers-and-special-characters-in-asp
const regexText = /^[a-zA-Z]*$/;
// Ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const regexEmail = /^\S+@\S+\.\S+$/;
// Ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    dni: "",
    password: "",
    repeat: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (!isSuccess) return;
    dispatch(reset());
    navigate("/login");
  }, [isSuccess]);

  // VALIDATION
  const validateForm = () => {
    const errorList = {};
    const { name, email, dni, password, repeat } = formData;

    if (name.length < 3 || !regexText.test(name)) {
      errorList.name =
        name.length < 3
          ? "El nombre debe tener más de 3 caracteres."
          : "El nombre no puede incluir caracteres especiales. (ej. % &)";
    }

    if (!regexEmail.test(email)) {
      errorList.email = "Introduce un email valido.";
    }

    if (dni.length !== 9 || !validDNI(dni)) {
      errorList.dni = "El DNI es incorrecto.";
    }

    if (!regexPassword.test(password)) {
      errorList.password =
        "La contraseña debe tener como mínimo 8 caracteres, y al menos una letra o número.";
    }

    if (repeat.length == 0 || repeat !== password) {
      errorList.repeat = "Las dos contraseñas deben coincidir.";
    }

    return errorList;
  };

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

    const errorList = validateForm();
    if (Object.keys(errorList).length > 0) return setErrors(errorList);
    setErrors({});

    dispatch(register(formData));
  };

  return (
    <>
      <Loader loading={isLoading} />

      <div className="page">
        <Topbar path={"/login"} />

        <section className="register">
          <div className="register__container">
            <p className="register__title">Regístrate en la banca Online</p>

            <p className="register__error">{message}</p>

            <form onSubmit={handleSubmit} className="register__form">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className={`register__input ${
                    errors.name && "register__input--error"
                  }`}
                />
                <p className="register__error">{errors.name}</p>
              </div>

              <div>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`register__input ${
                    errors.email && "register__input--error"
                  }`}
                />
                <p className="register__error">{errors.email}</p>
              </div>

              <div>
                <input
                  name="dni"
                  type="text"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={handleChange}
                  className={`register__input ${
                    errors.dni && "register__input--error"
                  }`}
                />
                <p className="register__error">{errors.dni}</p>
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Clave"
                  value={formData.password}
                  onChange={handleChange}
                  className={`register__input ${
                    errors.password && "register__input--error"
                  }`}
                />
                <p className="register__error">{errors.password}</p>
              </div>

              <div>
                <input
                  name="repeat"
                  type="password"
                  placeholder="Repite Clave"
                  value={formData.repeat}
                  onChange={handleChange}
                  className={`register__input ${
                    errors.repeat && "register__input--error"
                  }`}
                />
                <p className="register__error">{errors.repeat}</p>
              </div>

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
    </>
  );
};

export default Register;
