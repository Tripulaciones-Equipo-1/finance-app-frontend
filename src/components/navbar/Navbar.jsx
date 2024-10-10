import React from "react";
import { useLocation } from "react-router-dom";

import houseIcon from "../../assets/icons/house-chimney.svg";
import houseFillIcon from "../../assets/icons/house-chimney-fill.svg";
import boxIcon from "../../assets/icons/box.svg";
import boxFillIcon from "../../assets/icons/box-fill.svg";
import compassIcon from "../../assets/icons/compass.svg";
import compassFillIcon from "../../assets/icons/compass-fill.svg";
import interrogationIcon from "../../assets/icons/interrogation.svg";
import interrogationFillIcon from "../../assets/icons/interrogation-fill.svg";
import menuIcon from "../../assets/icons/menu.svg";
import menuFillIcon from "../../assets/icons/menu-fill.svg";

import "./Navbar.scss";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <a href="/accounts" className="navbar__link">
        <img
          src={location.pathname === "/accounts" ? houseFillIcon : houseIcon}
          alt="house icon"
          className="navbar__icon"
        />
        <p
          className={`navbar__text ${
            location.pathname === "/accounts" && "navbar__text--highlight"
          }`}
        >
          Resumen
        </p>
      </a>

      <a href="#" className="navbar__link">
        <img
          src={location.pathname === "/" ? boxFillIcon : boxIcon}
          alt="house icon"
          className="navbar__icon"
        />
        <p
          className={`navbar__text ${
            location.pathname === "/" && "navbar__text--highlight"
          }`}
        >
          Buzón
        </p>
      </a>

      <a href="#" className="navbar__link">
        <img
          src={location.pathname === "/" ? compassFillIcon : compassIcon}
          alt="house icon"
          className="navbar__icon"
        />
        <p
          className={`navbar__text ${
            location.pathname === "/" && "navbar__text--highlight"
          }`}
        >
          Explorar
        </p>
      </a>

      <a href="#" className="navbar__link">
        <img
          src={
            location.pathname === "/"
              ? interrogationFillIcon
              : interrogationIcon
          }
          alt="house icon"
          className="navbar__icon"
        />
        <p
          className={`navbar__text ${
            location.pathname === "/" && "navbar__text--highlight"
          }`}
        >
          Ayuda
        </p>
      </a>

      <a href="#" className="navbar__link">
        <img
          src={location.pathname === "/" ? menuFillIcon : menuIcon}
          alt="house icon"
          className="navbar__icon"
        />
        <p
          className={`navbar__text ${
            location.pathname === "/" && "navbar__text--highlight"
          }`}
        >
          Más
        </p>
      </a>
    </nav>
  );
};

export default Navbar;
