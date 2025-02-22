import { useEffect, useState } from "react";

function useGetElementsByCartId(
  user,
  activeCart,
  productsInCart,
  viandsInCart,
  setProductsInCart,
  setViandsInCart
) {
  const authToken = localStorage.getItem("authToken");

  const [elementsInCart, setElementsInCart] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      if (activeCart) {
        try {
          const response = await fetch(
            `http://localhost:3010/cart-item/get/${activeCart.cartId}`,
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

          // Construir elementos del carrito
          const combinedElements = [...data];

          if (productsInCart.length > 0) {
            combinedElements.push(
              ...productsInCart.map((product) => ({
                cart: activeCart,
                product,
                viand: null,
                quantity: product.quantity,
              }))
            );
          }

          if (viandsInCart.length > 0) {
            combinedElements.push(
              ...viandsInCart.map((viand) => ({
                cart: activeCart,
                product: null,
                viand,
                quantity: viand.quantity,
              }))
            );
          }

          setElementsInCart(combinedElements);
        } catch (error) {
          console.error("Error al obtener los elementos del carrito:", error);
        }
      }
    };

    fetchElements();
  }, [activeCart]);

  return { elementsInCart, setElementsInCart };
}

export default useGetElementsByCartId;
