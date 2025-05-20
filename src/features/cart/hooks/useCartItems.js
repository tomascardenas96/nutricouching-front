import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useCartItems() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useCartItems must be within ElementsInCartProvider context"
    );
  const { elementsInCart, setElementsInCart } = context;
  return { elementsInCart, setElementsInCart };
}
