import "./Header.css";
import { BsCart4 } from "react-icons/bs";
import React from "react";
import { useUser } from "../../context/UserProvider";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import useLogOut from "../../hooks/useLogOut";
import useLogin from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Header({ handleCartModal, quantityOfProductsInCart }) {
  const { user } = useUser();
  const { handleLogOut } = useLogOut();

  const { handleLoginModal, isLoginModalOpen } = useLogin();

  const { isRegisterModalOpen, handleRegisterModal } = useRegister();

  return (
    <div className="header">
      <div className="header-logo">
        <div>
          <img
            src="../src/public/assets/nutricouching-logo.jpg"
            alt="nutricoaching-logo"
          />
          <p>Nutri-coaching</p>
          <p>Integral</p>
        </div>
      </div>
      <div className="header-menu">
        <ul>
          <li>INICIO</li>
          <li>SERVICIOS</li>
          <li>PRODUCTOS</li>
          <li>VIANDAS</li>
          <li>CONOCENOS</li>
          <li className="header-cart_container" onClick={handleCartModal}>
            <BsCart4 className="header-cart" />
            <div className="cart-amount">
              <p>{quantityOfProductsInCart().toString()}</p>
            </div>
          </li>
        </ul>
      </div>
      {user ? (
        <div className="header-user">
          <p>
            <FaUser className="user-icon" />
            {user?.name} {user?.lastname}
          </p>
          <span>|</span>
          <p className="log-out" onClick={handleLogOut}>
            {" "}
            <RiLogoutBoxRLine className="log-out-icon" />
            Salir
          </p>
        </div>
      ) : (
        <div className="header-login">
          <div>
            <p onClick={handleRegisterModal} className="register-button">
              Registrate gratis
            </p>
            <input
              type="button"
              value="Iniciar sesion"
              onClick={handleLoginModal}
            />
          </div>
        </div>
      )}
      {/* Modales con renderizado condicional */}
      {isLoginModalOpen && <LoginModal handleLoginModal={handleLoginModal} />}

      {isRegisterModalOpen && (
        <RegisterModal handleRegisterModal={handleRegisterModal} />
      )}
    </div>
  );
}

export default Header;
