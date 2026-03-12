import { useContext } from "react";
import { CartActionsContext, CartStateContext } from "../context/CartContext";

export function useViandsCart() {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions)
    throw new Error("useViandsCart must be within CartProvider");
  return {
    viandsInCart: state.viandsInCart,
    setViandsInCart: actions.setViandsInCart,
  };
}
