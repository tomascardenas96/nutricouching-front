import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "./AboutCard.css";

function AboutCard({ image, name, role }) {
  return (
    <div className="about-card_container">
      <div className="about-card_image">
        <img
          src={image}
          alt="professional-picture"
        />
      </div>

      <div className="about-card_description">
        <div className="about-card_info">
          <h1>{name}</h1>
          <h2>Coach Ontologico</h2>
          <div className="social-networks">
            <FaFacebookF />
            <SiGmail />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
