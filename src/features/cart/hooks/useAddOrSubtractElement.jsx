import apiClient from "../../auth/api/apiClient";

function useAddOrSubtractElement(elementsInCart, setElementsInCart) {
  const handleAddOrSubtractElement = async (product, cartId, action) => {
    try {
      const { data } = await apiClient.patch(
        `/cart-item/add-subtract/${cartId}/${
          product.productId ? product.productId : product.viandId
        }`,
        { action }
      );

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
