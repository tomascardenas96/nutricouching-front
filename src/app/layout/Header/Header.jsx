import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../../../common/logo/Logo";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useCartItems } from "../../../features/cart/hooks/useCartItems";
import { useCartSyncStatus } from "../../../features/cart/hooks/useCartSyncStatus";
import useEmptyCart from "../../../features/cart/hooks/useEmptyCart";
import { useProductCart } from "../../../features/cart/hooks/useProductsCart";
import { useViandsCart } from "../../../features/cart/hooks/useViandsCart";
import UpdateUserModal from "../../../features/user/components/UpdateUserModal";
import BurgerMenu from "./BurgerMenu";
import HeaderActions from "./HeaderActions";
import HeaderNav from "./HeaderNav";
import HeaderTopbar from "./HeaderTopbar";
import "./Header.css";
import { useHeaderScroll } from "./hooks/useHeaderScroll";

function Header({
  handleCartModal,
  activeCart,
  setActiveCart,
  setIsNotificationsModalOpen,
  handleOpenUpdateUserModal,
  isUpdateUserModalOpen,
  setIsUpdateUserModalOpen,
}) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { isStuck, isExiting, headerRef } = useHeaderScroll();

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
  }, [handleLogOut, handleEmptyLocalStorageCart, setActiveCart, hasSyncedCart]);

  const handleChangeBurgerMenu = useCallback(() => {
    setIsBurgerMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      {isStuck && <div className="header-spacer" aria-hidden="true" />}
      <div
        className={`header-wrapper${isStuck ? " header-wrapper--stuck" : ""}${isExiting ? " header-wrapper--exiting" : ""}`}
      >
        <HeaderTopbar />

        <div ref={headerRef} className="header" id="main-page">
          <Logo />
          <HeaderNav />

          <HeaderActions
            user={user}
            userLoading={userLoading}
            quantityOfProductsInCart={quantityOfProductsInCart}
            handleCartModal={handleCartModal}
            handleOpenUpdateUserModal={handleOpenUpdateUserModal}
            handleLogOut={handleLogOutEmptyCart}
          />

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
