import { Link } from "react-router-dom";

function HeaderNav() {
  return (
    <nav className="header-menu">
      <ul>
        <li>
          <Link to="/#">Inicio</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/viands">Viandas</Link>
        </li>
        <li>
          <Link to="/professionals">Profesionales</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
