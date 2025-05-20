import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useCartSyncStatus() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useCartSyncStatus must be within ElementsInCartProvider context"
    );
  const { hasSyncedCart } = context;
  return { hasSyncedCart };
}
