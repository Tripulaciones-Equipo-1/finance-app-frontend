import React from "react";
import "./bottombar.scss";
import face from "../../assets/icons/social/facebook-icon.svg";
import insta from "../../assets/icons/social/insta-icon.svg";
import twitter from "../../assets/icons/social/twitter-icon.svg";
import youtube from "../../assets/icons/social/youtube-icon.svg";
import likelind from "../../assets/icons/social/likelind-icon.svg";

const Bottombar = () => {
  return (
    <section className="bottombar">
      <div className="bottom__container">
        <a href="#" className="bottom__logo">
          <img src={face} alt="facebook-icon" />
        </a>
        <a href="#" className="bottom__logo">
          <img src={insta} alt="insta-icon" />
        </a>
        <a href="#" className="bottom__logo">
          <img src={twitter} alt="twitter-icon" />
        </a>
        <a href="#" className="bottom__logo">
          <img src={youtube} alt="youtube-icon" />
        </a>
        <a href="#" className="bottom__logo">
          <img src={likelind} alt="likelind-icon" />
        </a>
      </div>
    </section>
  );
};

export default Bottombar;
