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
        <>
          <p className="topbar__text">{title}</p>
          <img src={logo} alt="kutxabank logo" className="topbar__logo" />
        </>
      ) : (
        <img src={logoBanner} alt="kutxabank logo" className="topbar__icon" />
      )}
    </section>
  );
};

export default Topbar;
