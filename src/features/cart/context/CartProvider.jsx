import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import apiClient from "../../auth/api/apiClient";
import { useAuth } from "../../auth/hooks/useAuth";
import useAddElementsToCartWhenLogin from "../hooks/useAddElementsToCartWhenLogin";
import useGetElementsByCartId from "../hooks/useGetElementsByCartId";
import { CartActionsContext, CartStateContext } from "./CartContext";

function CartProvider({ children }) {
  const [activeCart, setActiveCart] = useState(null);
  const [activeCartError, setActiveCartError] = useState(null);
  const [activeCartLoading, setActiveCartLoading] = useState(true);
  const [elementsInCart, setElementsInCart] = useState([]);
  const [productsInCart, setProductsInCart] = useState(() => {
    try {
      const stored = localStorage.getItem("products-cart");
      return stored ? (JSON.parse(stored).products ?? []) : [];
    } catch {
      return [];
    }
  });
  const [viandsInCart, setViandsInCart] = useState(() => {
    try {
      const stored = localStorage.getItem("viands-cart");
      return stored ? (JSON.parse(stored).viands ?? []) : [];
    } catch {
      return [];
    }
  });

  const hasSyncedCart = useRef(false);

  const { user } = useAuth();

  const { getElementsByActiveCart } = useGetElementsByCartId(setElementsInCart);
  const { addElementsToCartWhenLogin } =
    useAddElementsToCartWhenLogin(setElementsInCart);

  const handleGetActiveCart = useCallback(async () => {
    try {
      const { data } = await apiClient.get("/cart/active");
      setActiveCart(data);
    } catch (error) {
      setActiveCartError(error);
    } finally {
      setActiveCartLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    handleGetActiveCart();
  }, [user, handleGetActiveCart]);

  useEffect(() => {
    if (!activeCart) return;
    getElementsByActiveCart(activeCart);

    if (!hasSyncedCart.current) {
      addElementsToCartWhenLogin(activeCart);
      hasSyncedCart.current = true;
    }
  }, [user, activeCart]);

  // State context value — recreated only when data changes
  const stateValue = useMemo(
    () => ({
      elementsInCart,
      productsInCart,
      viandsInCart,
      activeCart,
      activeCartError,
      activeCartLoading,
    }),
    [elementsInCart, productsInCart, viandsInCart, activeCart, activeCartError, activeCartLoading]
  );

  // Actions context value — stable references, never triggers re-renders
  const actionsValue = useMemo(
    () => ({ setElementsInCart, setProductsInCart, setViandsInCart, setActiveCart, hasSyncedCart }),
    [] // setState functions and refs are stable
  );

  return (
    <CartActionsContext.Provider value={actionsValue}>
      <CartStateContext.Provider value={stateValue}>
        {children}
      </CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

export default CartProvider;
