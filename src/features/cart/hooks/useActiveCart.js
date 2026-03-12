import { useContext } from "react";
import { CartActionsContext, CartStateContext } from "../context/CartContext";

export function useActiveCart() {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions)
    throw new Error("useActiveCart must be within CartProvider");
  return { activeCart: state.activeCart, setActiveCart: actions.setActiveCart };
}
