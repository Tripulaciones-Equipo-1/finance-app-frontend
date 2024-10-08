import React from "react";

import arrowIcon from "../../assets/icons/arrow-left.svg";

import "./Topbar.scss";

const Topbar = ({ path, title }) => {
  return (
    <section className="topbar">
      {path && (
        <a href={path} className="topbar__back">
          <img src={arrowIcon} alt="go back icon" />
        </a>
      )}
      {title ? <p className="topbar__text">Topbar</p> : "me"}
    </section>
  );
};

export default Topbar;
