import "./Header.css";
import { BsCart4 } from "react-icons/bs";
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <div>
          <img src="../src/public/assets/nutricouching-logo.jpg" alt="" />
          <p>Nutri-couching</p>
          <p>Integral</p>
        </div>
      </div>
      <div className="header-menu">
        <ul>
          <li>INICIO</li>
          <li>PRODUCTOS</li>
          <li>SERVICIOS</li>
          <li>VIANDAS</li>
          <li>CONOCENOS</li>
          <li className="header-cart_container">
            <BsCart4 className="header-cart" />
            <div className="cart-amount">
              <p>0</p>
            </div>
          </li>
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
