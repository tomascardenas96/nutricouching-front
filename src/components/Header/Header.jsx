import "./Header.css";
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <div>
          <img src="../src/assets/nutricouching-logo.jpg" alt="" />
          <p>Nutri-couching</p>
          <p>Integral</p>
        </div>
      </div>
      <div className="header-menu">
        <ul>
          <li>INICIO</li>
          <li>PRODUCTOS</li>
          <li>SERVICIOS</li>
          <li>RECETAS</li>
          <li>OPINIONES</li>
        </ul>
      </div>
      <div className="header-login">
        <div>
          <p>Registrate gratis</p>
          <input type="button" value="Iniciar sesion" />
        </div>
      </div>
    </div>
  );
}

export default Header;
