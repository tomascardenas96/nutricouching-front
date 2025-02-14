import React from "react";
import { BsCart4 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useLogin } from "../../context/UserProvider";
import "./Header.css";
import useRegister from "../../hooks/useRegister";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useElementsInCart } from "../../context/ElementsInCartProvider";

function Header({
  handleCartModal,
  setProductsInCart,
  setViandsInCart,
  user,
  productsInCart,
  viandsInCart,
}) {
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

  const { elementsInCart, setElementsInCart } = useElementsInCart();

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

  const logOut = () => {
    handleLogOut();
    // Limpiamos el carrito (Tanto los productos en el local storage como en la DB)
    setElementsInCart([]);
    setProductsInCart([]);
    setViandsInCart([]);
  };

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
          <p className="log-out" onClick={logOut}>
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
    </div>
  );
}

export default Header;
