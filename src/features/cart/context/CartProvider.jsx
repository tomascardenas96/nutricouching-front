import React, { useEffect, useRef, useState } from "react";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import { HOST } from "../../../api/data";
import useAddElementsToCartWhenLogin from "../hooks/useAddElementsToCartWhenLogin";
import useGetElementsByCartId from "../hooks/useGetElementsByCartId";
import { CartContext } from "./CartContext";

function CartProvider({ children }) {
  // Carrito del usuario activo
  const [activeCart, setActiveCart] = useState(null);
  const [activeCartError, setActiveCartError] = useState(null);
  const [elementsInCart, setElementsInCart] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [viandsInCart, setViandsInCart] = useState([]);

  // Referencia para evitar múltiples ejecuciones
  const hasSyncedCart = useRef(false);

  // Usuario activo
  const { user } = useAuthUser();

  // Custom hook para obtener todos los elementos guardados en el carrito activo (DB)
  const {
    getElementsByCartError,
    getElementsByCartLoading,
    getElementsByActiveCart,
  } = useGetElementsByCartId(setElementsInCart);

  // Custom hook para agregar los productos del local storage a los ya existentes dentro del carrito activo
  const { addElementsError, addElementsToCartWhenLogin } =
    useAddElementsToCartWhenLogin(setElementsInCart);

  // Metodo para obtener el carrito activo
  const handleGetActiveCart = async (userId) => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${HOST}/cart/active/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setActiveCart(data);
    } catch (error) {
      setActiveCartError(error);
    }
  };

  // Cuando el componente se monta y tenemos ya un usuario activo, obtenemos su carrito
  useEffect(() => {
    if (!user) return;

    // Obtenemos el carrito activo
    handleGetActiveCart(user.userId);
  }, [user]);

  useEffect(() => {
    if (!activeCart) return;
    getElementsByActiveCart(activeCart);

    // Sincronizamos el carrito activo con el local storage
    if (!hasSyncedCart.current) {
      addElementsToCartWhenLogin(activeCart);
      hasSyncedCart.current = true; // Marca como ejecutado
    }
  }, [user, activeCart]);

  return (
    <CartContext.Provider
      value={{
        elementsInCart,
        setElementsInCart,
        productsInCart,
        viandsInCart,
        setProductsInCart,
        setViandsInCart,
        activeCart,
        activeCartError,
        setActiveCart,
        hasSyncedCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
