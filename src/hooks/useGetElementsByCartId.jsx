import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetElementsByCartId(setElementsInCart) {
  const [getElementsByCartError, setGetElementsByCartError] = useState(null);
  const [getElementsByCartLoading, setGetElementsByCartLoading] =
    useState(true);

  const authToken = localStorage.getItem("authToken");

  const getElementsByActiveCart = async (activeCart) => {
    try {
      const response = await fetch(
        `${HOST}/cart-item/get/${activeCart.cartId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

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
