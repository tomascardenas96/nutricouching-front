import { useContext } from "react";
import { CartActionsContext } from "../context/CartContext";

export function useCartSyncStatus() {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error("useCartSyncStatus must be within CartProvider");
  return { hasSyncedCart: context.hasSyncedCart };
}
