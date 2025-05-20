import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useActiveCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useActiveCart must be within ElementsInCartProvider context"
    );
  const { activeCart, setActiveCart, activeCartError } = context;
  return { activeCart, setActiveCart, activeCartError };
}
