import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useProductCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useProductCart must be within ElementsInCartProvider context"
    );
  const { productsInCart, setProductsInCart } = context;
  return { productsInCart, setProductsInCart };
}
