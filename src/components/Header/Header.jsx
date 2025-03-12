import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart4 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useLogin } from "../../context/UserProvider";
import useEmptyCart from "../../hooks/useEmptyCart";
import useRegister from "../../hooks/useRegister";
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";
import UpdateUserModal from "../Update-user/UpdateUserModal";
import "./Header.css";

function Header({
  handleCartModal,
  user,
  productsInCart,
  viandsInCart,
  handleChangeBurgerMenu,
  elementsInCart,
  handleEmptyCartModal,
  setProductsInCart,
  activeCart,
  setViandsInCart,
  setElementsInCart,
  setActiveCart,
  hasSyncedCart,
}) {
  const [scrolled, setScrolled] = useState(null);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  const {
    loginInput,
    loginLoading,
    loginError,
    handleSubmitLogin,
    handleChangeLogin,
    handleLoginModal,
    isLoginModalOpen,
    handleLogOut,
  } = useLogin();

  const { isRegisterModalOpen, handleRegisterModal } = useRegister();

  // Metodo para calcular la cantidad de elementos en el carrito.
  const quantityOfProductsInCart = () => {
    if (elementsInCart.length > 0) {
      const totalPriceElementsInCart = elementsInCart.reduce((acc, sub) => {
        if (sub.product) {
          return acc + sub.quantity;
        } else if (sub.viand) {
          return acc + sub.quantity;
        }
      }, 0);

      return totalPriceElementsInCart;
    }

    const productsQuantity = productsInCart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);

    const viandsQuantity = viandsInCart.reduce((acc, viand) => {
      return acc + viand.quantity;
    }, 0);

    return productsQuantity + viandsQuantity;
  };

  // Abrir o cerrar el modal para actualizar un usuario
  const handleOpenUpdateUserModal = () => {
    setIsUpdateUserModalOpen(!isUpdateUserModalOpen);
  };

  const { handleEmptyLocalStorageCart } = useEmptyCart(
    setProductsInCart,
    activeCart,
    setViandsInCart,
    setElementsInCart
  );

  const handleLogOutEmptyCart = () => {
    handleLogOut();
    handleEmptyLocalStorageCart();
    setActiveCart(null);
    hasSyncedCart.current = false;
  };

  // Cambiamos de color el header al hacer scroll
  useEffect(() => {
    const mainElement = document.querySelector("main");

    if (!mainElement) return;

    const handleScroll = () => {
      setScrolled(mainElement.scrollTop > 50);
    };

    mainElement.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={scrolled ? "header header-scrolled" : "header"}>
      <div className="responsive-menu_mobile">
        <GiHamburgerMenu
          onClick={handleChangeBurgerMenu}
          className={scrolled ? "icon icon-scrolled" : "icon"}
        />

        <div className="burger-menu">
          <BsCart4
            className={scrolled ? "icon icon-scrolled" : "icon"}
            onClick={handleCartModal}
          />
          <IoIosNotifications
            className={scrolled ? "icon icon-scrolled" : "icon"}
          />
        </div>
      </div>

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
          <p onClick={handleOpenUpdateUserModal}>
            <FaUser className="user-icon" />
            {user?.name} {user?.lastname}
          </p>
          <span>|</span>
          <p className="log-out" onClick={handleLogOutEmptyCart}>
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
      {isLoginModalOpen && (
        <LoginModal
          handleLoginModal={handleLoginModal}
          loginInput={loginInput}
          loginLoading={loginLoading}
          loginError={loginError}
          handleSubmitLogin={handleSubmitLogin}
          handleChangeLogin={handleChangeLogin}
          isLoginModalOpen={isLoginModalOpen}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal handleRegisterModal={handleRegisterModal} />
      )}

      {isUpdateUserModalOpen &&
        createPortal(
          <UpdateUserModal
            handleOpenUpdateUserModal={handleOpenUpdateUserModal}
            setIsUpdateUserModalOpen={setIsUpdateUserModalOpen}
          />,
          document.body
        )}
    </div>
  );
}

export default Header;
