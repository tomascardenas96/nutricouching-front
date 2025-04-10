import { useState } from "react";
import { HOST } from "../api/data";

function useAddElementsToCartWhenLogin(setElementsInCart) {
  const [addElementsError, setAddElementsError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const addElementsToCartWhenLogin = async (activeCart) => {
    try {
      const productsInLocal = localStorage.getItem("products-cart");
      const viandsInLocal = localStorage.getItem("viands-cart");

      const parsedProducts = JSON.parse(productsInLocal) || { products: [] };
      const parsedViands = JSON.parse(viandsInLocal) || { viands: [] };

      if (!parsedProducts.products.length && !parsedViands.viands.length) {
        return;
      }

      const body = JSON.stringify({
        products: parsedProducts.products,
        viands: parsedViands.viands,
      });

      const response = await fetch(
        `${HOST}/cart-item/add/${activeCart.cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setElementsInCart((prev) => {
        const mergedMap = new Map();

        // Agregamos los elementos previos al Map
        prev.forEach((item) => mergedMap.set(item.cartItemId, item));

        // Agregamos los nuevos elementos sin eliminar productos o viandas existentes
        data.forEach((item) => {
          const existingItem = mergedMap.get(item.cartItemId);

          if (existingItem) {
            mergedMap.set(item.cartItemId, {
              ...existingItem,
              quantity: item.quantity, // Actualizamos la cantidad
              product: existingItem.product || null, // Si hay nuevo producto, lo actualiza
              viand: existingItem.viand || null, // Si hay nueva vianda, la actualiza
            });
          } else {
            mergedMap.set(item.cartItemId, item); // Si es nuevo, lo agregamos directamente
          }
        });

        // Retornamos el nuevo array actualizado
        return Array.from(mergedMap.values());
      });

      localStorage.removeItem("products-cart");
      localStorage.removeItem("viands-cart");
      console.log("Carrito sincronizado correctamente");
    } catch (error) {
      setAddElementsError(error);
      console.error("Error al sincronizar el carrito:", error);
    }
  };

  return { addElementsError, addElementsToCartWhenLogin };
}

export default useAddElementsToCartWhenLogin;
