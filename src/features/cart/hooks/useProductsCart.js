import { useContext } from "react";
import { CartActionsContext, CartStateContext } from "../context/CartContext";

export function useProductCart() {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions)
    throw new Error("useProductCart must be within CartProvider");
  return {
    productsInCart: state.productsInCart,
    setProductsInCart: actions.setProductsInCart,
  };
}
