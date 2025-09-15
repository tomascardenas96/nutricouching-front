import { FaFacebookF, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>
        <div className="top-container">
          <div className="footer_links">
            <div className="footer_logo">
              <img src="/assets/nutricouching-logo.jpg" />
              <h1>Cohesiva.com</h1>
            </div>
          </div>
        </div>

        <ul className="sections">
          <li>INICIO</li>
          <li>PRODUCTOS</li>
          <li>CONOCENOS</li>
          <li>CARRITO</li>
          <li>CONTACTO</li>
        </ul>

        <div className="social">
          <ul>
            <li>
              <a>
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a>
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a>
                <FaInstagram />
              </a>
            </li>
            <li>
              <a>
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a>
                <FaTiktok />
              </a>
            </li>
          </ul>
        </div>

        <p>
          Copyright © 2025 Todos los derechos reservados | Creado por{" "}
          {/* <a href="http://www.tomascardenas.me" target="_blank"> */}
          tomascardenas.me
          {/* </a> */}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
