import { toast } from "sonner";
import { HOST } from "../api/data";
import { useActiveCart } from "../context/UserProvider";

function useEmptyCart(setElementsInCart) {
  const { activeCart } = useActiveCart();
  const authToken = localStorage.getItem("authToken");

  const handleEmptyCart = async () => {
    try {
      const response = await fetch(`${HOST}/cart-item/${activeCart.cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
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
