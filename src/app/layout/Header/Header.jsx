import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart4 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbUserPentagon, TbUserStar } from "react-icons/tb";
import LoaderSpinner from "../../../common/components/LoaderSpinner";
import LoginModal from "../../../features/auth/components/Login/LoginModal";
import RegisterModal from "../../../features/auth/components/Register/RegisterModal";
import { useAuthRequest } from "../../../features/auth/hooks/useAuthRequest";
import { useAuthUser } from "../../../features/auth/hooks/useAuthUser";
import { useLoginModal } from "../../../features/auth/hooks/useLoginModal";
import useRegister from "../../../features/auth/hooks/useRegister";
import { useCartItems } from "../../../features/cart/hooks/useCartItems";
import { useCartSyncStatus } from "../../../features/cart/hooks/useCartSyncStatus";
import useEmptyCart from "../../../features/cart/hooks/useEmptyCart";
import { useProductCart } from "../../../features/cart/hooks/useProductsCart";
import { useViandsCart } from "../../../features/cart/hooks/useViandsCart";
import UpdateUserModal from "../../../features/user/components/UpdateUserModal";
import MobileMenu from "../mobileMenu/MobileMenu";
import "./Header.css";

function Header({
  handleCartModal,
  activeCart,
  setActiveCart,
  setIsNotificationsModalOpen,
  handleOpenUpdateUserModal,
  isUpdateUserModalOpen,
  setIsUpdateUserModalOpen,
  handleCmsModal,
  handleAdminCmsModal,
}) {
  const [scrolled, setScrolled] = useState(null);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const { user, handleLogOut } = useAuthUser();
  const { userError, userLoading } = useAuthRequest();
  const { hasSyncedCart } = useCartSyncStatus();

  const { productsInCart, setProductsInCart } = useProductCart();
  const { viandsInCart, setViandsInCart } = useViandsCart();
  const { elementsInCart, setElementsInCart } = useCartItems();

  const { handleLoginModal, isLoginModalOpen } = useLoginModal();
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

  const handleChangeBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

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
    <div
      className={scrolled ? "header header-scrolled" : "header"}
      id="main-page"
    >
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
          {user && (
            <IoIosNotifications
              className={scrolled ? "icon icon-scrolled" : "icon"}
              onClick={() => setIsNotificationsModalOpen(true)}
            />
          )}

          {(user?.professional?.role === "admin" ||
            user?.professional?.role === "root") && (
            <div className="admin-menu_burger-header">
              {(user?.professional?.role === "admin" ||
                user?.professional?.role === "root") && (
                <TbUserStar
                  className={
                    scrolled
                      ? "professional_menu icon-scrolled"
                      : "professional_menu"
                  }
                  onClick={handleAdminCmsModal}
                />
              )}

              {user?.professional?.role === "root" && (
                <TbUserPentagon
                  className={
                    scrolled
                      ? "root-user_menu icon-scrolled root-extended"
                      : "root-user_menu"
                  }
                  onClick={handleCmsModal}
                />
              )}
            </div>
          )}
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
          <li>
            <a href="/#main-page">INICIO</a>
          </li>
          <li>
            <a href="/#products">PRODUCTOS</a>
          </li>
          <li>
            <a href="/#viands">VIANDAS</a>
          </li>
          <li>
            <a href="/#about">CONOCENOS</a>
          </li>
          {(user?.professional?.role === "admin" ||
            user?.professional?.role === "root") && (
            <li>
              <a
                href={`${
                  user?.professional?.role === "admin"
                    ? "/professional"
                    : "/root"
                }`}
                target="_blank"
              >
                DASHBOARD
              </a>
            </li>
          )}
          <li className="header-cart_container" onClick={handleCartModal}>
            <BsCart4 className="header-cart" />
            <div className="cart-amount">
              <p>{quantityOfProductsInCart().toString()}</p>
            </div>
          </li>
        </ul>
      </div>

      {!userLoading ? (
        user ? (
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
        )
      ) : (
        <div className="loader-spinner_user">
          <LoaderSpinner />
        </div>
      )}

      {/* Modales con renderizado condicional */}
      {isLoginModalOpen && (
        <LoginModal
          handleLoginModal={handleLoginModal}
          handleRegisterModal={handleRegisterModal}
        />
      )}

      {isBurgerMenuOpen &&
        createPortal(
          <MobileMenu
            handleChangeBurgerMenu={handleChangeBurgerMenu}
            handleLoginModal={handleLoginModal}
            setActiveCart={setActiveCart}
            setElementsInCart={setElementsInCart}
            handleOpenUpdateUserModal={handleOpenUpdateUserModal}
            handleRegisterModal={handleRegisterModal}
            scrolled={scrolled}
          />,
          document.body
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
