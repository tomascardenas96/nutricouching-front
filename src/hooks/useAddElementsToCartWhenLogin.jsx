import { useEffect, useState, useRef } from "react";
import { HOST } from "../api/data";
import { useActiveCart, useUser } from "../context/UserProvider";

function useAddElementsToCartWhenLogin(setElementsInCart) {
  const [addElementsError, setAddElementsError] = useState(null);
  const { user } = useUser();
  const { activeCart } = useActiveCart();
  const authToken = localStorage.getItem("authToken");

  // Referencia para evitar múltiples ejecuciones
  const hasSyncedCart = useRef(false);

  useEffect(() => {
    if (user && !hasSyncedCart.current) {
      addElementsToCartWhenLogin(user);
      hasSyncedCart.current = true; // Marca como ejecutado
    }
  }, [user]);

  const addElementsToCartWhenLogin = async (user) => {
    try {
      const productsInLocal = localStorage.getItem("products-cart");
      const viandsInLocal = localStorage.getItem("viands-cart");

      if (!productsInLocal && !viandsInLocal) {
        return;
      }

      const parsedProducts = JSON.parse(productsInLocal) || { products: [] };
      const parsedViands = JSON.parse(viandsInLocal) || { viands: [] };

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

      if (data.error) {
        throw new Error(data.message);
      }

      setElementsInCart((prev) => {
        const uniqueItems = new Map();

        const addToMap = (key, item) => {
          if (!uniqueItems.has(key)) {
            uniqueItems.set(key, { ...item });
          } else {
            uniqueItems.get(key).quantity += item.quantity;
          }
        };

        prev.forEach((item) => {
          const key = item.product ? item.product.name : item.viand.name;
          addToMap(key, item);
        });

        data.forEach((item) => {
          const key = item.product ? item.product.name : item.viand.name;
          addToMap(key, item);
        });

        // Solo retorna valores únicos
        return Array.from(uniqueItems.values());
      });

      localStorage.removeItem("products-cart");
      localStorage.removeItem("viands-cart");
      console.log("Carrito sincronizado correctamente");
    } catch (error) {
      setAddElementsError(error);
      console.error("Error al sincronizar el carrito:", error);
    }
  };

  return { addElementsError };
}

export default useAddElementsToCartWhenLogin;
