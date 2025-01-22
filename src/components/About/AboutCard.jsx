import "./AboutCard.css";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { HOST } from "../../api/data";
import React from "react";

function AboutCard({ image, name, role }) {
  return (
    <div className="about-card_container">
      <div className="about-card_image">
        <img
          src={`${HOST}/uploads/professionals/${image}`}
          alt="professional-picture"
        />
      </div>
      <div className="about-card_description">
        <div className="about-card_info">
          <div className="name-social">
            <h1>{name}</h1>
            <div className="social-networks">
              <FaFacebookF />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCard;
