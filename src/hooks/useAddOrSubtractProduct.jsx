import useAddOrSubtractElement from "./useAddOrSubtractElement";

function useAddOrSubtractProduct(
  activeCart,
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
    // Si el usuario no esta logueado, agregar una unidad al local storage.
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
      // De lo contrario agregarlo directamente a la DB.
      handleAddOrSubtractElement(product, activeCart.cartId, "add");
    }
  };

  const subtractUnityOfProduct = (product) => {
    // Si el usuario no esta logueado, restar una unidad al local storage.
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
      // De lo contrario restarlo directamente de la DB.
      handleAddOrSubtractElement(product, activeCart.cartId, "subtract");
    }
  };

  return { addUnityOfProduct, subtractUnityOfProduct };
}

export default useAddOrSubtractProduct;
