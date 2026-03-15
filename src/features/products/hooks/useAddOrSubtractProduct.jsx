function useAddOrSubtractProduct(setProductsInCart) {
  const addUnityOfProduct = (product) => {
    setProductsInCart((prev) => {
      const updated = prev.map((p) =>
        p.productId === product.productId ? { ...p, quantity: p.quantity + 1 } : p
      );
      localStorage.setItem("products-cart", JSON.stringify({ products: updated }));
      return updated;
    });
  };

  const subtractUnityOfProduct = (product) => {
    if (product.quantity === 1) return;
    setProductsInCart((prev) => {
      const updated = prev.map((p) =>
        p.productId === product.productId ? { ...p, quantity: p.quantity - 1 } : p
      );
      localStorage.setItem("products-cart", JSON.stringify({ products: updated }));
      return updated;
    });
  };

  return { addUnityOfProduct, subtractUnityOfProduct };
}

export default useAddOrSubtractProduct;
