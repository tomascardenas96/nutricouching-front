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
}) {
  const { user, handleLogOut } = useUser();

  const openLoginModal = () => {
    handleChangeBurgerMenu();
    handleLoginModal();
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
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
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
          <li>INICIO</li>
          <li>SERVICIOS</li>
          <li>PRODUCTOS</li>
          <li>VIANDAS</li>
          <li>CONOCENOS</li>
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
