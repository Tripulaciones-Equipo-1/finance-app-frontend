import React from "react";

import arrowIcon from "../../assets/icons/arrow-left.svg";
import logoBanner from "../../assets/images/kutxabank-banner-2.jpg";
import logo from "../../assets/images/logo.jpg";

import "./Topbar.scss";

const Topbar = ({ path, title }) => {
  return (
    <section className="topbar">
      {path && (
        <a href={path} className="topbar__back">
          <img src={arrowIcon} alt="go back icon" />
        </a>
      )}
      {title ? (
        <div className="topbar__container">
          <p className="topbar__text">{title}</p>
          <a
            href="https://portal.kutxabank.es/cs/Satellite/kb/es/particulares"
            target="_blank"
          >
            <img src={logo} alt="kutxabank logo" className="topbar__logo" />
          </a>
        </div>
      ) : (
        <div className="topbar__container">
          <a
            href="https://portal.kutxabank.es/cs/Satellite/kb/es/particulares"
            target="_blank"
          >
            <img src={logo} alt="kutxabank logo" className="topbar__icon" />
            <p>utxaCiclo</p>
          </a>
        </div>
      )}
    </section>
  );
};

export default Topbar;
