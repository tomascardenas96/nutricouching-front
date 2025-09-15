import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function useActiveCartRequest() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartItems must be within ElementsInCartProvider context"
    );
  }

  const { activeCartError, activeCartLoading } = context;

  return { activeCartError, activeCartLoading };
}

export default useActiveCartRequest;
