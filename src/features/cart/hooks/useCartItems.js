import { useContext } from "react";
import { CartActionsContext, CartStateContext } from "../context/CartContext";

export function useCartItems() {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions)
    throw new Error("useCartItems must be within CartProvider");
  return {
    elementsInCart: state.elementsInCart,
    setElementsInCart: actions.setElementsInCart,
  };
}
