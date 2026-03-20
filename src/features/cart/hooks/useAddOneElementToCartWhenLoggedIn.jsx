import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useAddOneElementToCartWhenLoggedIn() {
  const handleAddOneElementToCart = (element, setElementsInCart) => {
    const addToCart = async () => {
      const body = element.productId
        ? { productId: element.productId }
        : { viandId: element.viandId };

      const { data } = await apiClient.post(
        `/cart-item/add-element`,
        body
      );

      setElementsInCart((prev) => {
        const exists = prev.find((e) => e.cartItemId === data.cartItemId);
        if (exists) {
          return prev.map((e) => (e.cartItemId === data.cartItemId ? data : e));
        }
        return [...prev, data];
      });

      return data;
    };

    const promise = addToCart();
    toast.promise(promise, {
      loading: "Agregando al carrito...",
      success: "Producto agregado al carrito",
      error: "Ocurrió un error al agregar el producto al carrito",
    });
    return promise;
  };

  return { handleAddOneElementToCart };
}

export default useAddOneElementToCartWhenLoggedIn;
