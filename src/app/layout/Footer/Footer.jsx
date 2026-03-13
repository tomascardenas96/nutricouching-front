import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Footer.css";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/#services" },
  { label: "Sobre nosotros", to: "/#about" },
  { label: "Productos", to: "/#products" },
  { label: "Viandas", to: "/#viands" },
  { label: "Testimonios", to: "/#testimonials" },
];

const SOCIAL_LINKS = [
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
  { icon: <FaTiktok />, href: "#", label: "TikTok" },
  { icon: <FaXTwitter />, href: "#", label: "X / Twitter" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/assets/cohesiva-logo.svg" alt="Cohesiva Salud" />
            <span>Cohesiva Salud</span>
          </div>
          <p className="footer__tagline">
            Nutrición, bienestar y acompañamiento profesional para una vida más saludable.
          </p>
          <div className="footer__social">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="footer__social-icon"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="footer__nav">
          <h4 className="footer__heading">Navegación</h4>
          <ul className="footer__links">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="footer__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__contact">
          <h4 className="footer__heading">Contacto</h4>
          <ul className="footer__contact-list">
            <li>contacto@cohesivasalud.com</li>
            <li>+54 11 0000-0000</li>
            <li>Buenos Aires, Argentina</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Cohesiva Salud. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
