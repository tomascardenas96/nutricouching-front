function useRemoveProductFromCart(setProductsInCart) {
  const handleRemoveProduct = (product) => {
    setProductsInCart((prev) => {
      const updated = prev.filter((p) => p.productId !== product.productId);
      localStorage.setItem("products-cart", JSON.stringify({ products: updated }));
      return updated;
    });
  };

  return { handleRemoveProduct };
}

export default useRemoveProductFromCart;
