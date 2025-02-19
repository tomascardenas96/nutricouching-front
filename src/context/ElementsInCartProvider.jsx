import React, { createContext, useContext } from "react";

const ElementsInCartContext = createContext(null);

export const useElementsInCart = () => useContext(ElementsInCartContext);

function ElementsInCartProvider({
  children,
  elementsInCart,
  setElementsInCart,
}) {
  return (
    <ElementsInCartContext.Provider
      value={{ elementsInCart, setElementsInCart }}
    >
      {children}
    </ElementsInCartContext.Provider>
  );
}

export default ElementsInCartProvider;
