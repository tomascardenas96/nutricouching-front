import { FaFacebookF, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="top-container">
        <div className="footer_links">
          <div className="footer_logo">
            <h1>COHESIVA SALUD</h1>
            <img src="/src/public/assets/nutricouching-logo.jpg"></img>
          </div>

          <div>
            <ul>
              <li>WEEBLY THEMES</li>
              <li>PRE-SALE FAQS</li>
              <li>SUBMIT A TICKET</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>SERVICES</li>
              <li>THEME TWEAK</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>SHOWCASE</li>
              <li>WIDGETKIT</li>
              <li>SUPPORT</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>ABOUT US</li>
              <li>CONTACT US</li>
              <li>AFFILIATES</li>
              <li>RESOURCES</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bottom-container">
        <div className="footer">
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

          <p>Creado por Tomas Cardenas - http://www.tomascardenas.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
