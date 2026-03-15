import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useAddOrSubtractElement(setElementsInCart) {
  const handleAddOrSubtractElement = async (cartItemId, action) => {
    try {
      await apiClient.patch(`/cart-item/add-subtract/${cartItemId}`, { action });

      setElementsInCart((prev) => {
        if (action === "subtract") {
          const element = prev.find((e) => e.cartItemId === cartItemId);
          if (element?.quantity === 1) {
            return prev.filter((e) => e.cartItemId !== cartItemId);
          }
        }
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + (action === "add" ? 1 : -1) }
            : item
        );
      });
    } catch {
      toast.error("Error al actualizar el carrito");
    }
  };

  const handleRemoveElement = async (cartItemId) => {
    setElementsInCart((prev) => prev.filter((e) => e.cartItemId !== cartItemId));
    try {
      await apiClient.delete(`/cart-item/item/${cartItemId}`);
    } catch {
      toast.error("Error al eliminar el item del carrito");
    }
  };

  return { handleAddOrSubtractElement, handleRemoveElement };
}

export default useAddOrSubtractElement;
