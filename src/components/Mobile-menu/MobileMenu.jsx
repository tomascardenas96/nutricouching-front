import { useUser } from "../../context/UserProvider";
import "./MobileMenu.css";
import { IoMdSettings } from "react-icons/io";

import React from "react";

function MobileMenu({
  handleChangeBurgerMenu,
  handleLoginModal,
  setActiveCart,
  setElementsInCart,
  handleOpenUpdateUserModal,
  handleRegisterModal,
  scrolled,
}) {
  const { user, handleLogOut } = useUser();

  const openLoginModal = () => {
    handleChangeBurgerMenu();
    handleLoginModal();
  };

  const openRegisterModal = () => {
    handleChangeBurgerMenu();
    handleRegisterModal();
  };

  const handleLogOutAndClear = () => {
    setActiveCart(null);
    setElementsInCart([]);
    localStorage.removeItem("products-cart");
    localStorage.removeItem("viands-cart");
    handleLogOut();
  };

  const handleOpenSettings = () => {
    handleChangeBurgerMenu();
    handleOpenUpdateUserModal();
  };

  return (
    <div className="mobile-menu_container" onClick={handleChangeBurgerMenu}>
      <div
        className={
          scrolled ? "mobile-menu mobile-menu_scrolled" : "mobile-menu"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {user && (
          <div className="user-info">
            <div>
              <p>
                {user?.name} {user?.lastname}
              </p>
              <span>{user?.email}</span>
            </div>

            <IoMdSettings
              className="settings-icon"
              onClick={handleOpenSettings}
            />
          </div>
        )}

        <ul>
          {!user && <li onClick={openLoginModal}>INICIAR SESION</li>}
          {!user && <li onClick={openRegisterModal}>REGISTRARSE</li>}
          <li onClick={handleChangeBurgerMenu}>
            <a href="/#main-page">INICIO</a>
          </li>
          <li onClick={handleChangeBurgerMenu}>
            <a href="/#services">SERVICIOS</a>
          </li>
          <li onClick={handleChangeBurgerMenu}>
            <a href="/#products">PRODUCTOS</a>
          </li>
          <li onClick={handleChangeBurgerMenu}>
            <a href="/#viands">VIANDAS</a>
          </li>
          <li onClick={handleChangeBurgerMenu}>
            <a href="/#about">CONOCENOS</a>
          </li>
          {user && <li onClick={handleLogOutAndClear}>SALIR</li>}
        </ul>

        <div className="mobile-menu_logo">
          <img
            src="/src/public/assets/nutricouching-logo.jpg"
            alt="Logo de nutricoaching integral"
          />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
