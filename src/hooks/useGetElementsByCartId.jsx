import { useEffect, useState } from "react";

function useGetElementsByCartId(
  user,
  productsInCart,
  viandsInCart,
  setProductsInCart,
  setViandsInCart
) {
  const [elementsInCart, setElementsInCart] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      if (user && user.cart) {
        try {
          const response = await fetch(
            `http://localhost:3010/cart-item/get/${user.cart.cartId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
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
                cart: user.cart,
                product,
                viand: null,
                quantity: product.quantity,
              }))
            );
          }

          if (viandsInCart.length > 0) {
            combinedElements.push(
              ...viandsInCart.map((viand) => ({
                cart: user.cart,
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
  }, [user]);

  return { elementsInCart, setElementsInCart };
}

export default useGetElementsByCartId;
