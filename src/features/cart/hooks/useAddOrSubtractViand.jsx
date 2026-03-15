function useAddOrSubtractViand(setViandsInCart) {
  const addUnityOfViand = (viand) => {
    setViandsInCart((prev) => {
      const updated = prev.map((v) =>
        v.viandId === viand.viandId ? { ...v, quantity: v.quantity + 1 } : v
      );
      localStorage.setItem("viands-cart", JSON.stringify({ viands: updated }));
      return updated;
    });
  };

  const subtractUnityOfViand = (viand) => {
    if (viand.quantity === 1) return;
    setViandsInCart((prev) => {
      const updated = prev.map((v) =>
        v.viandId === viand.viandId ? { ...v, quantity: v.quantity - 1 } : v
      );
      localStorage.setItem("viands-cart", JSON.stringify({ viands: updated }));
      return updated;
    });
  };

  return { addUnityOfViand, subtractUnityOfViand };
}

export default useAddOrSubtractViand;
