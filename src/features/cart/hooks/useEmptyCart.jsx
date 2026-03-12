import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useEmptyCart(
  setElementsInCart,
  activeCart,
  setProductsInCart,
  setViandsInCart
) {
  const handleEmptyCart = async () => {
    try {
      await apiClient.delete(`/cart-item/${activeCart.cartId}`);

      setElementsInCart([]);
      setProductsInCart([]);
      setViandsInCart([]);
    } catch (error) {
      toast.error("Ocurrio un error al limpiar el carrito");
    }
  };

  const handleEmptyLocalStorageCart = () => {
    localStorage.removeItem("products-cart");
    localStorage.removeItem("viands-cart");
    setProductsInCart([]);
    setViandsInCart([]);
    setElementsInCart([]);
  };

  return { handleEmptyCart, handleEmptyLocalStorageCart };
}

export default useEmptyCart;
