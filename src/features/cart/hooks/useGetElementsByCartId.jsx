import { useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetElementsByCartId(setElementsInCart) {
  const [getElementsByCartError, setGetElementsByCartError] = useState(null);
  const [getElementsByCartLoading, setGetElementsByCartLoading] =
    useState(true);

  const getElementsByActiveCart = async (activeCart) => {
    try {
      const { data } = await apiClient.get(`/cart-item/get/${activeCart.cartId}`);
      setElementsInCart(data);
    } catch (error) {
      console.error("Error al obtener los elementos del carrito:", error);
      setGetElementsByCartError(true);
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
