import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useAddElementsToCartWhenLogin(setElementsInCart) {
  const addElementsToCartWhenLogin = async (activeCart) => {
    try {
      const productsInLocal = localStorage.getItem("products-cart");
      const viandsInLocal = localStorage.getItem("viands-cart");

      const parsedProducts = JSON.parse(productsInLocal) || { products: [] };
      const parsedViands = JSON.parse(viandsInLocal) || { viands: [] };

      if (!parsedProducts.products.length && !parsedViands.viands.length) {
        return;
      }

      const { data } = await apiClient.post(`/cart-item/add/${activeCart.cartId}`, {
        products: parsedProducts.products,
        viands: parsedViands.viands,
      });

      setElementsInCart((prev) => {
        const mergedMap = new Map();
        prev.forEach((item) => mergedMap.set(item.cartItemId, item));
        data.forEach((item) => {
          const existing = mergedMap.get(item.cartItemId);
          if (existing) {
            mergedMap.set(item.cartItemId, {
              ...existing,
              quantity: item.quantity,
              product: existing.product || null,
              viand: existing.viand || null,
            });
          } else {
            mergedMap.set(item.cartItemId, item);
          }
        });
        return Array.from(mergedMap.values());
      });

      localStorage.removeItem("products-cart");
      localStorage.removeItem("viands-cart");
    } catch (error) {
      toast.error("Error al sincronizar el carrito");
    }
  };

  return { addElementsToCartWhenLogin };
}

export default useAddElementsToCartWhenLogin;
