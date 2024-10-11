import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./Home.scss"
import telIcono from "../../assets/images/tel-icono.png";
import regis from "../../assets/images/agregar.png"


const Home = () => {
  return (
    <div>
      <Topbar />

      <section className="home">
        <div className="home__container">
          <a href="/login" className="home__login">
            <div className="home__login">
                  <img src={telIcono} alt="iconTel" className="home__iconTel"/>
                  <p className="home__titleLog">acceso a banca móvil</p>
            </div> 
            </a>
            <a href="/register" className="home__register">
            <div className="home__register">
                  <img src={regis} alt="iconoTel" className="home__iconRegis"/>
                  <p className="home__titleRegis">Registrate a  banca móvil</p>
            </div> 
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
