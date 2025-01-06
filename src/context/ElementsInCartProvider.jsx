import React, { createContext, useContext } from "react";
import useGetElementsByCartId from "../hooks/useGetElementsByCartId";

const ElementsInCartContext = createContext(null);

export const useElementsInCart = () => useContext(ElementsInCartContext);

function ElementsInCartProvider({
  children,
  user,
  productsInCart,
  viandsInCart,
  setProductsInCart,
  setViandsInCart,
}) {
  const { elementsInCart, setElementsInCart } = useGetElementsByCartId(
    user,
    productsInCart,
    viandsInCart,
    setProductsInCart,
    setViandsInCart
  );

  return (
    <ElementsInCartContext.Provider
      value={{ elementsInCart, setElementsInCart }}
    >
      {children}
    </ElementsInCartContext.Provider>
  );
}

export default ElementsInCartProvider;
