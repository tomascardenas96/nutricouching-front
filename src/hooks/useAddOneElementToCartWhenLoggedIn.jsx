import { toast } from "sonner";
import { HOST } from "../api/data";

function useAddOneElementToCartWhenLoggedIn(
  user,
  setElementsInCart,
  activeCart,
  setActiveCart
) {
  const authToken = localStorage.getItem("authToken");

  const handleAddOneElementToCart = (element) => {
    const AddOneElementToCartPromise = () => {
      try {
        if (element.productId) {
          return handleAddProductWhenLoggedIn(element.productId);
        } else if (element.viandId) {
          return handleAddViandWhenLoggedIn(element.viandId);
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

  const handleAddProductWhenLoggedIn = async (productId) => {
    try {
      const response = await fetch(
        `${HOST}/cart-item/add-element/${activeCart.cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

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

  const handleAddViandWhenLoggedIn = async (viandId) => {
    try {
      const response = await fetch(
        `${HOST}/cart-item/add-element/${activeCart.cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ viandId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

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
