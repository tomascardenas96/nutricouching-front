import "./Footer.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="footer-cards">
        <div className="footer-item">
          <div className="card-header">
            <h2>Direccion</h2>
          </div>
          <div className="card-body">
            <p>
              <FaLocationDot className="location-icon" />
              Calle falsa 123 Benito Juarez, Buenos Aires
            </p>
            <p>
              <IoIosPhonePortrait className="location-icon" />
              +549 2281-504490
            </p>
            <p>
              <FaEnvelope className="location-icon" />
              natashadirialdi@gmail.com
            </p>
          </div>
        </div>
        <div className="footer-item">
          <div className="card-header">
            <h2>Horarios de atencion</h2>
          </div>
          <div className="card-body">
            <div className="schedule-container">
              <div>
                <p>Martes a Viernes</p>
                <p>9:00am a 18:00pm</p>
              </div>
              <div>
                <p>Sabado</p>
                <p>9:00am a 23:00pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-item">
          <div className="card-header">
            <h2>Redes sociales</h2>
          </div>
          <div className="card-body">
            <div className="social-network">
              <div className="social-network_icons">
                <div>
                  <FaFacebookF />
                </div>
                <div>
                  <FaXTwitter />
                </div>
                <div>
                  <FaInstagram />
                </div>
                <div>
                  <FaLinkedin />
                </div>
                <div>
                  <FaTiktok />
                </div>
              </div>
              <div className="social-network_recommend">
                <div>Etiquetanos en tus fotos! 🩵</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
