import { toast } from "sonner";
import { useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetElementsByCartId(setElementsInCart) {
  const [getElementsByCartError, setGetElementsByCartError] = useState(null);
  const [getElementsByCartLoading, setGetElementsByCartLoading] = useState(true);

  const getElementsByActiveCart = async (activeCart) => {
    try {
      const { data } = await apiClient.get(`/cart-item/${activeCart.cartId}`);
      setElementsInCart(data);
    } catch (error) {
      setGetElementsByCartError(true);
      toast.error("No se pudieron cargar los items del carrito");
    } finally {
      setGetElementsByCartLoading(false);
    }
  };

  return {
    getElementsByCartError,
    getElementsByCartLoading,
    getElementsByActiveCart,
  };
}

export default useGetElementsByCartId;
