import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useViandsCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useViandsCart must be within ElementsInCartProvider context"
    );
  const { viandsInCart, setViandsInCart } = context;
  return { viandsInCart, setViandsInCart };
}
