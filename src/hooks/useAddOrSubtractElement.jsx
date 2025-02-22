import { HOST } from "../api/data";

function useAddOrSubtractElement(elementsInCart, setElementsInCart) {
  const authToken = localStorage.getItem("authToken");

  const handleAddOrSubtractElement = async (product, cartId, action) => {
    try {
      const response = await fetch(
        `${HOST}/cart-item/add-subtract/${cartId}/${
          product.productId ? product.productId : product.viandId
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ action }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setElementsInCart((prev) => {
        return prev.map((item) => {
          if (item.product && item.product.productId === product.productId) {
            return {
              ...item,
              quantity: item.quantity + (action === "add" ? 1 : -1),
            };
          } else if (item.viand && item.viand.viandId === product.viandId) {
            return {
              ...item,
              quantity: item.quantity + (action === "add" ? 1 : -1),
            };
          }
          return item;
        });
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAddOrSubtractElement };
}

export default useAddOrSubtractElement;
