import { useCallback, useEffect, useRef, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../../common/components/LoaderSpinner";
import OptionsModal from "./modals/OptionsModal";

function HeaderActions({
  user,
  userLoading,
  quantityOfProductsInCart,
  handleCartModal,
  handleOpenUpdateUserModal,
  handleLogOut,
}) {
  const [isOptionsModalDeployed, setIsOptionsModalDeployed] = useState(false);
  const navigate = useNavigate();
  const actionsRef = useRef(null);

  // advanced-event-handler-refs: stable ref so the listener is registered once
  const isOptionsModalOpenRef = useRef(false);
  isOptionsModalOpenRef.current = isOptionsModalDeployed;

  const handleUserIconClick = useCallback(() => {
    if (!user) {
      navigate("/login");
    } else {
      setIsOptionsModalDeployed((prev) => !prev);
    }
  }, [user, navigate]);

  // registered once — reads latest modal state via ref
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isOptionsModalOpenRef.current) return;
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setIsOptionsModalDeployed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header-actions" ref={actionsRef}>
      {/* Dashboard icon — admin/professional only */}
      {(user?.role === "admin" || user?.role === "professional") && (
        <a
          className="header-action-btn"
          href={user.role === "admin" ? "/root" : "/professional"}
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
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
}

export default HeaderActions;
