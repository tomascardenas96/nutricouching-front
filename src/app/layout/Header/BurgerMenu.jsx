import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import { CiSettings } from "react-icons/ci";

function BurgerMenu({
  handleChangeBurgerMenu,
  handleLoginModal,
  setActiveCart,
  setElementsInCart,
  handleOpenUpdateUserModal,
  handleRegisterModal,
  user,
  handleLogOut,
}) {
  return (
    <div className="burger-menu_container" onClick={handleChangeBurgerMenu}>
      <div className="burger-menu" onClick={(e) => e.stopPropagation()}>
        {user && (
          <div className="logged-user_information">
            <div>
              <p>
                {user.name} {user.lastname}
              </p>
              <span>{user.email}</span>
            </div>
            <div>
              <CiSettings className="settings-icon" />
            </div>
          </div>
        )}

        <ul>
          {!user && (
            <>
              <li
                onClick={() => {
                  handleRegisterModal();
                  handleChangeBurgerMenu();
                }}
              >
                REGISTRARSE
              </li>
              <li
                onClick={() => {
                  handleLoginModal();
                  handleChangeBurgerMenu();
                }}
              >
                INICIAR SESION
              </li>
            </>
          )}
          <li>INICIO</li>
          {user?.professional && (
            <Link to={user.professional.role === "root" ? "/root" : "/professional"}>
              <li>DASHBOARD</li>
            </Link>
          )}
          <li>SERVICIOS</li>
          <li>PRODUCTOS</li>
          <li>TESTIMONIOS</li>
          <li>FAQ</li>
          {user && (
            <li className="log-out" onClick={handleLogOut}>
              SALIR
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;
