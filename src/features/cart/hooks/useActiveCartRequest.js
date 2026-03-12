import { useContext } from "react";
import { CartStateContext } from "../context/CartContext";

function useActiveCartRequest() {
  const context = useContext(CartStateContext);
  if (!context)
    throw new Error("useActiveCartRequest must be within CartProvider");
  const { activeCartError, activeCartLoading } = context;
  return { activeCartError, activeCartLoading };
}

export default useActiveCartRequest;
