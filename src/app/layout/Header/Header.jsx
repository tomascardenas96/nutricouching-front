import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart4 } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLayoutGrid } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import LoaderSpinner from "../../../common/components/LoaderSpinner";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useCartItems } from "../../../features/cart/hooks/useCartItems";
import { useCartSyncStatus } from "../../../features/cart/hooks/useCartSyncStatus";
import useEmptyCart from "../../../features/cart/hooks/useEmptyCart";
import { useProductCart } from "../../../features/cart/hooks/useProductsCart";
import { useViandsCart } from "../../../features/cart/hooks/useViandsCart";
import UpdateUserModal from "../../../features/user/components/UpdateUserModal";
import BurgerMenu from "./BurgerMenu";
import "./Header.css";
import OptionsModal from "./modals/OptionsModal";

function Header({
  handleCartModal,
  activeCart,
  setActiveCart,
  setIsNotificationsModalOpen,
  handleOpenUpdateUserModal,
  isUpdateUserModalOpen,
  setIsUpdateUserModalOpen,
}) {
  const [scrolled, setScrolled] = useState(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isOptionsModalDeployed, setIsOptionsModalDeployed] = useState(false);
  const navigate = useNavigate();
  const actionsRef = useRef(null);
  const exitTimerRef = useRef(null);
  const wasStuckRef = useRef(false);

  const {
    user,
    handleLogout: handleLogOut,
    isLoading: userLoading,
  } = useAuth();
  const { hasSyncedCart } = useCartSyncStatus();

  const { productsInCart, setProductsInCart } = useProductCart();
  const { viandsInCart, setViandsInCart } = useViandsCart();
  const { elementsInCart, setElementsInCart } = useCartItems();

  const quantityOfProductsInCart = useMemo(() => {
    if (elementsInCart.length > 0) {
      return elementsInCart.reduce((acc, sub) => acc + sub.quantity, 0);
    }
    const productsQuantity = productsInCart.reduce(
      (acc, p) => acc + p.quantity,
      0,
    );
    const viandsQuantity = viandsInCart.reduce((acc, v) => acc + v.quantity, 0);
    return productsQuantity + viandsQuantity;
  }, [elementsInCart, productsInCart, viandsInCart]);

  const { handleEmptyLocalStorageCart } = useEmptyCart(
    setProductsInCart,
    activeCart,
    setViandsInCart,
    setElementsInCart,
  );

  const handleLogOutEmptyCart = useCallback(() => {
    handleLogOut();
    handleEmptyLocalStorageCart();
    setActiveCart(null);
    hasSyncedCart.current = false;
    setIsOptionsModalDeployed(false);
  }, [handleLogOut, handleEmptyLocalStorageCart, setActiveCart, hasSyncedCart]);

  const handleChangeBurgerMenu = useCallback(() => {
    setIsBurgerMenuOpen((prev) => !prev);
  }, []);

  const handleUserIconClick = useCallback(() => {
    if (!user) {
      navigate("/login");
    } else {
      setIsOptionsModalDeployed((prev) => !prev);
    }
  }, [user, navigate]);

  // Close options modal on outside click
  useEffect(() => {
    if (!isOptionsModalDeployed) return;
    const handleClickOutside = (e) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setIsOptionsModalDeployed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOptionsModalDeployed]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 100;
      setScrolled(shouldStick);

      if (shouldStick) {
        clearTimeout(exitTimerRef.current);
        setIsExiting(false);
        setIsStuck(true);
        wasStuckRef.current = true;
      } else if (wasStuckRef.current) {
        setIsExiting(true);
        exitTimerRef.current = setTimeout(() => {
          setIsStuck(false);
          setIsExiting(false);
          wasStuckRef.current = false;
        }, 280);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(exitTimerRef.current);
    };
  }, []);

  return (
    <>
      {isStuck && <div className="header-spacer" aria-hidden="true" />}
      <div
        className={`header-wrapper${isStuck ? " header-wrapper--stuck" : ""}${isExiting ? " header-wrapper--exiting" : ""}`}
      >
        {/* Topbar */}
        <div className="header-topbar">
          <div className="header-topbar__social">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
          <div className="header-topbar__contact">
            <span>
              <MdOutlinePhone /> +549 2281-332211
            </span>
            <span>
              <MdOutlineEmail /> administracion@cohesiva.com
            </span>
          </div>
        </div>

        {/* Main header */}
        <div
          className={`header${scrolled ? " header--scrolled" : ""}`}
          id="main-page"
        >
          {/* Logo */}
          <div className="header-logo">
            <div>
              <Link to="/" className="logo-container">
                <img src="/assets/cohesiva-logo.svg" alt="cohesiva-logo" />
                <div className="logo-name">
                  <p>Cohesiva</p>
                  <p>Salud</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="header-menu">
            <ul>
              <li>
                <a href="/#">Inicio</a>
              </li>
              <li>
                <a href="/#products">Productos</a>
              </li>
              <li>
                <a href="/#viands">Viandas</a>
              </li>
              <li>
                <Link to="/filter/professionals">Profesionales</Link>
              </li>
              <li>
                <a href="/#contact">Contacto</a>
              </li>
            </ul>
          </nav>

          {/* Actions: dashboard + cart + user */}
          <div className="header-actions" ref={actionsRef}>
            {/* Dashboard icon — admin/root only */}
            {(user?.role === "admin" || user?.role === "root") && (
              <a
                className="header-action-btn"
                href={user?.role === "admin" ? "/professional" : "/root"}
                target="_blank"
                aria-label="Dashboard"
              >
                <TbLayoutGrid />
              </a>
            )}

            {/* Cart */}
            <button
              className="header-action-btn header-cart_container"
              onClick={handleCartModal}
              aria-label="Carrito"
            >
              <BsCart4 className="header-cart" />
              {quantityOfProductsInCart > 0 && (
                <div className="cart-amount">
                  <p>{quantityOfProductsInCart}</p>
                </div>
              )}
            </button>

            {/* User */}
            {!userLoading ? (
              <button
                className={`header-action-btn header-user-btn${user ? " header-user-btn--logged" : ""}`}
                onClick={handleUserIconClick}
                aria-label={user ? "Mi cuenta" : "Iniciar sesión"}
              >
                {user ? (
                  <span className="header-user-avatar">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                ) : (
                  <VscAccount />
                )}
              </button>
            ) : (
              <div className="header-action-spinner">
                <LoaderSpinner />
              </div>
            )}

            {/* Options dropdown */}
            {isOptionsModalDeployed && (
              <OptionsModal
                onClose={() => setIsOptionsModalDeployed(false)}
                handleOpenUpdateUserModal={handleOpenUpdateUserModal}
                handleLogOut={handleLogOutEmptyCart}
              />
            )}
          </div>

          {/* Mobile menu */}
          <div className="mobile_burger-menu">
            <div
              className="header-cart_container mobile_header-cart_container"
              onClick={handleCartModal}
            >
              <BsCart4 className="header-cart_mobile" />
              {quantityOfProductsInCart > 0 && (
                <div className="cart-amount">
                  <p>{quantityOfProductsInCart}</p>
                </div>
              )}
            </div>
            <RxHamburgerMenu
              className="burger-menu_icon"
              onClick={handleChangeBurgerMenu}
            />
          </div>

          {isBurgerMenuOpen &&
            createPortal(
              <BurgerMenu
                handleChangeBurgerMenu={handleChangeBurgerMenu}
                setActiveCart={setActiveCart}
                setElementsInCart={setElementsInCart}
                handleOpenUpdateUserModal={handleOpenUpdateUserModal}
                user={user}
                handleLogOut={handleLogOut}
              />,
              document.body,
            )}

          {isUpdateUserModalOpen &&
            createPortal(
              <UpdateUserModal
                handleOpenUpdateUserModal={handleOpenUpdateUserModal}
                setIsUpdateUserModalOpen={setIsUpdateUserModalOpen}
              />,
              document.body,
            )}
        </div>
      </div>
    </>
  );
}

export default Header;
