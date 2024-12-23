function useAddOrSubtractProduct(setProductsInCart) {
  const productsInLocalStorage = localStorage.getItem("products-cart");
  const parsedProductsInLocalStorage = JSON.parse(productsInLocalStorage);

  const addUnityOfProduct = (product) => {
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
  };

  const subtractUnityOfProduct = (product) => {
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
  };

  return { addUnityOfProduct, subtractUnityOfProduct };
}

export default useAddOrSubtractProduct;
