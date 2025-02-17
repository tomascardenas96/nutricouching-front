import { toast } from "sonner";
import { HOST } from "../api/data";

function useEmptyCart(setElementsInCart) {
  const handleEmptyCart = async (cartId) => {
    try {
      const response = await fetch(`${HOST}/cart-item/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setElementsInCart([]);
      toast.success("Carrito vaciado");
    } catch (error) {
      toast.error("Ocurrio un error al limpiar el carrito");
    }
  };

  return { handleEmptyCart };
}

export default useEmptyCart;
