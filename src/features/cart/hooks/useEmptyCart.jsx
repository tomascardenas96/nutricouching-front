import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useEmptyCart(
  setElementsInCart,
  activeCart,
  setProductsInCart,
  setViandsInCart,
  
) {
  const authToken = localStorage.getItem("authToken");

  const handleEmptyCart = async () => {
    try {
      const response = await fetch(`${HOST}/cart-item/${activeCart.cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setElementsInCart([]);
      setProductsInCart([]);
      setViandsInCart([]);
      toast.success("Carrito vaciado");
    } catch (error) {
      toast.error("Ocurrio un error al limpiar el carrito");
    }
  };

  const handleEmptyLocalStorageCart = () => {
    localStorage.removeItem("products-cart");
    localStorage.removeItem("viands-cart");
    setProductsInCart([]);
    setViandsInCart([]);
    setElementsInCart([])
    toast.success("Carrito vaciado");
  };

  return { handleEmptyCart, handleEmptyLocalStorageCart };
}

export default useEmptyCart;
