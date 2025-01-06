import useAddOrSubtractElement from "./useAddOrSubtractElement";

function useAddOrSubtractProduct(
  setProductsInCart,
  user,
  elementsInCart,
  setElementsInCart
) {
  const productsInLocalStorage = localStorage.getItem("products-cart");
  const parsedProductsInLocalStorage = JSON.parse(productsInLocalStorage);
  const { handleAddOrSubtractElement } = useAddOrSubtractElement(
    elementsInCart,
    setElementsInCart
  );

  const addUnityOfProduct = (product) => {
    if (!user) {
      const productIndex = parsedProductsInLocalStorage.products.findIndex(
        (prod) => prod.productId === product.productId
      );

      parsedProductsInLocalStorage.products[productIndex].quantity += 1;

      localStorage.setItem(
        "products-cart",
        JSON.stringify(parsedProductsInLocalStorage)
      );

      setProductsInCart((prev) => {
        return prev.map((prod) => {
          if (prod.productId === product.productId) {
            return {
              ...prod,
              quantity: prod.quantity + 1,
            };
          }
          return prod;
        });
      });
    } else {
      handleAddOrSubtractElement(product, user.cart.cartId, "add");
    }
  };

  const subtractUnityOfProduct = (product) => {
    if (!user) {
      if (product.quantity === 1) {
        return;
      }

      const productIndex = parsedProductsInLocalStorage.products.findIndex(
        (prod) => prod.productId === product.productId
      );

      parsedProductsInLocalStorage.products[productIndex].quantity -= 1;

      localStorage.setItem(
        "products-cart",
        JSON.stringify(parsedProductsInLocalStorage)
      );

      setProductsInCart((prev) => {
        return prev.map((prod) => {
          if (prod.productId === product.productId) {
            return {
              ...prod,
              quantity: prod.quantity - 1,
            };
          }
          return prod;
        });
      });
    } else {
      handleAddOrSubtractElement(product, user.cart.cartId, "subtract");
    }
  };

  return { addUnityOfProduct, subtractUnityOfProduct };
}

export default useAddOrSubtractProduct;
