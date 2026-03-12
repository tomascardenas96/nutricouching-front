import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useAddOneElementToCartWhenLoggedIn() {
  const handleAddOneElementToCart = (
    element,
    activeCart,
    setElementsInCart
  ) => {
    const AddOneElementToCartPromise = () => {
      try {
        if (element.productId) {
          return handleAddProductWhenLoggedIn(
            element.productId,
            activeCart,
            setElementsInCart
          );
        } else if (element.viandId) {
          return handleAddViandWhenLoggedIn(
            element.viandId,
            activeCart,
            setElementsInCart
          );
        }
      } catch (error) {
        throw new Error("Error adding product to cart");
      }
    };

    toast.promise(AddOneElementToCartPromise(), {
      loading: "Agregando producto al carrito...",
      success: "Producto agregado al carrito",
      error: "Ocurrió un error al agregar el producto al carrito",
    });
  };

  const handleAddProductWhenLoggedIn = async (
    productId,
    activeCart,
    setElementsInCart
  ) => {
    try {
      const { data } = await apiClient.post(
        `/cart-item/add-element/${activeCart.cartId}`,
        { productId }
      );

      // Si el producto ya está en el carrito, se actualiza la cantidad
      setElementsInCart((prev) => {
        const existentInCart = prev.find(
          (element) => element.cartItemId === data.cartItemId
        );
        if (existentInCart) {
          return prev.map((element) =>
            element.cartItemId === data.cartItemId ? data : element
          );
        }

        return [...prev, data];
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddViandWhenLoggedIn = async (
    viandId,
    activeCart,
    setElementsInCart
  ) => {
    try {
      const { data } = await apiClient.post(
        `/cart-item/add-element/${activeCart.cartId}`,
        { viandId }
      );

      // Si el producto ya está en el carrito, se actualiza la cantidad
      setElementsInCart((prev) => {
        const existentInCart = prev.find(
          (element) => element.cartItemId === data.cartItemId
        );
        if (existentInCart) {
          return prev.map((element) =>
            element.cartItemId === data.cartItemId ? data : element
          );
        }

        return [...prev, data];
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAddOneElementToCart };
}

export default useAddOneElementToCartWhenLoggedIn;
