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
              <img src="/assets/nutricouching-logo.jpg"></img>
              <h1>
                Cohesiva <br /> Salud
              </h1>
            </div>
          </div>
        </div>

        <hr />

        <div className="mid-container"></div>

        <hr />

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

            <p>
              Creado por Tomas Cardenas -{" "}
              <a href="http://www.tomascardenas.me" target="_blank">
                tomascardenas.me
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
