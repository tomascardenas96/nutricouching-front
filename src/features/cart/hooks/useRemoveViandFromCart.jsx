function useRemoveViandFromCart(setViandsInCart) {
  const handleRemoveViand = (viand) => {
    setViandsInCart((prev) => {
      const updated = prev.filter((v) => v.viandId !== viand.viandId);
      localStorage.setItem("viands-cart", JSON.stringify({ viands: updated }));
      return updated;
    });
  };

  return { handleRemoveViand };
}

export default useRemoveViandFromCart;
