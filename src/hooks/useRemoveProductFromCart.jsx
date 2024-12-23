function useRemoveProductFromCart(setProductsInCart, productsInCart) {
  const handleRemoveProduct = (product) => {
    const filterProducts = productsInCart.filter(
      (prod) => prod.productId !== product.productId
    );

    setProductsInCart(filterProducts);

    localStorage.setItem(
      "products-cart",
      JSON.stringify({ products: filterProducts })
    );
  };

  return { handleRemoveProduct };
}

export default useRemoveProductFromCart;
