function useAddOrSubtractViand(setViandsInCart) {
  const viandsInLocalStorage = localStorage.getItem("viands-cart");
  const parsedViandsInLocalStorage = JSON.parse(viandsInLocalStorage);

  const addUnityOfViand = (viand) => {
    const viandIndex = parsedViandsInLocalStorage.viands.findIndex(
      (v) => v.viandId === viand.viandId
    );

    parsedViandsInLocalStorage.viands[viandIndex].quantity += 1;

    localStorage.setItem(
      "viands-cart",
      JSON.stringify(parsedViandsInLocalStorage)
    );

    setViandsInCart((prev) => {
      return prev.map((v) => {
        if (v.viandId === viand.viandId) {
          return {
            ...v,
            quantity: v.quantity + 1,
          };
        }
        return v;
      });
    });
  };

  const subtractUnityOfViand = (viand) => {
    if (viand.quantity === 1) {
      return;
    }

    const viandIndex = parsedViandsInLocalStorage.viands.findIndex(
      (v) => v.viandId === viand.viandId
    );

    parsedViandsInLocalStorage.viands[viandIndex].quantity -= 1;

    localStorage.setItem(
      "viands-cart",
      JSON.stringify(parsedViandsInLocalStorage)
    );

    setViandsInCart((prev) => {
      return prev.map((v) => {
        if (v.viandId === viand.viandId) {
          return {
            ...v,
            quantity: v.quantity - 1,
          };
        }
        return v;
      });
    });
  };

  return { addUnityOfViand, subtractUnityOfViand };
}

export default useAddOrSubtractViand;
