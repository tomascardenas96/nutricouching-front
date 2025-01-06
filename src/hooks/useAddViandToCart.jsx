import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../context/UserProvider";
import useAddOneElementToCartWhenLoggedIn from "./useAddOneElementToCartWhenLoggedIn";

function useAddViandToCart() {
  const { user } = useUser();
  // Este metodo llama a la API para agregar una vianda al carrito (solo cuando el usuario está logueado).
  const { handleAddOneElementToCart } =
    useAddOneElementToCartWhenLoggedIn(user);
  const [viandsCart, setViandsCart] = useState([]);

  // Función para agregar una vianda al carrito
  const addViandToCart = async (viand) => {
    if (!user) {
      // Recuperar las viandas del carrito del localStorage
      const addedViands = localStorage.getItem("viands-cart");
      const parsedAddedViands = addedViands
        ? JSON.parse(addedViands)
        : { viands: [] };

      // Verificar si la vianda ya está en el carrito
      const existentViandsInCart = parsedAddedViands?.viands?.find(
        (via) => via.viandId === viand.viandId
      );

      if (existentViandsInCart) {
        // Si el producto ya existe, aumentar su cantidad
        existentViandsInCart.quantity += 1;
      } else {
        // Si el producto no existe, agregarlo al carrito con cantidad 1
        parsedAddedViands.viands.push({
          viandId: viand.viandId,
          quantity: 1,
        });
      }

      // Guardar los productos actualizados en el localStorage
      localStorage.setItem("viands-cart", JSON.stringify(parsedAddedViands));

      // Actualizar el estado del carrito, lo que provocará un re-renderizado
      setViandsCart({ viands: [...parsedAddedViands.viands] });
      toast.success("Vianda agregada al carrito");
    } else {
      handleAddOneElementToCart(viand);
    }
  };

  // useEffect para actualizar el estado del carrito cuando cambie el localStorage
  useEffect(() => {
    const addedViands = localStorage.getItem("viands-cart");
    const parsedAddedViands = addedViands
      ? JSON.parse(addedViands)
      : { viands: [] };
    setViandsCart({ viands: [...parsedAddedViands.viands] }); // Sincronizar el estado con el carrito del localStorage
  }, []); // Solo se ejecuta una vez al montar el componente

  return { addViandToCart, viandsCart, setViandsCart };
}

export default useAddViandToCart;
