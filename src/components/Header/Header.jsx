import "./Header.css";
import React from "react";

function Header() {
  return (
    <>
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
          <li>RECETAS</li>
          <li>SOBRE MI</li>
        </ul>
      </div>
      <div className="header-login">
        <div>
          <input type="button" value="Iniciar sesion" />
          <p>O registrate gratis</p>
        </div>
      </div>
    </>
  );
}

export default Header;
