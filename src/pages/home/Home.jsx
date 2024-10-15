import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Bottomvar from "../../components/bottombar/Bottombar";
import "./Home.scss";
import telIcono from "../../assets/icons/tel-icono.svg";
import regis from "../../assets/icons/user-icon.svg";

const Home = () => {
  return (
    <div className="page">
      <Topbar />

      <section className="home">
        <div className="home__container">
          <a href="/login" className="home__option">
            <img src={telIcono} alt="iconTel" className="home__icon" />
            <p className="home__title">Acceso a banca móvil</p>
          </a>
          <a href="/register" className="home__option">
            <img src={regis} alt="iconoTel" className="home__icon" />
            <p className="home__title">Regístrate a banca móvil</p>
          </a>
        </div>
      </section>

      <Bottomvar />
    </div>
  );
};

export default Home;
