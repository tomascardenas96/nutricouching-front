function useRemoveViandFromCart(setViandsInCart, viandsInCart) {
  const handleRemoveViand = (viand) => {
    const filterViands = viandsInCart?.filter(
      (via) => via.viandId !== viand.viandId
    );

    setViandsInCart(filterViands);

    localStorage.setItem(
      "viands-cart",
      JSON.stringify({ viands: filterViands })
    );
  };

  return { handleRemoveViand };
}

export default useRemoveViandFromCart;
