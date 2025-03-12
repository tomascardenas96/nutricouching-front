import { useUser } from "../../context/UserProvider";
import "./MobileMenu.css";
import { IoMdSettings } from "react-icons/io";

import React from "react";

function MobileMenu({ handleChangeBurgerMenu, handleLoginModal }) {
  const { user, handleLogOut } = useUser();

  const openLoginModal = () => {
    handleChangeBurgerMenu();
    handleLoginModal();
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

            <IoMdSettings className="settings-icon" />
          </div>
        )}

        <ul>
          {!user && <li onClick={openLoginModal}>INICIAR SESION</li>}
          <li>INICIO</li>
          <li>SERVICIOS</li>
          <li>PRODUCTOS</li>
          <li>VIANDAS</li>
          <li>CONOCENOS</li>
          {user && <li onClick={handleLogOut}>SALIR</li>}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
