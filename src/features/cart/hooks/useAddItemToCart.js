import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import useAddOneElementToCartWhenLoggedIn from "./useAddOneElementToCartWhenLoggedIn";

const CONFIG = {
  product: {
    storageKey: "products-cart",
    idField: "productId",
    arrayKey: "products",
    message: "Producto agregado al carrito",
  },
  viand: {
    storageKey: "viands-cart",
    idField: "viandId",
    arrayKey: "viands",
    message: "Vianda agregada al carrito",
  },
};

function useAddItemToCart(type, setElementsInCart, activeCart) {
  const { storageKey, idField, arrayKey, message } = CONFIG[type];
  const { user } = useAuth();
  const [itemsCart, setItemsCart] = useState([]);
  const { handleAddOneElementToCart } = useAddOneElementToCartWhenLoggedIn();

  const addItemToCart = async (item) => {
    if (!user) {
      const stored = localStorage.getItem(storageKey);
      const parsed = stored ? JSON.parse(stored) : { [arrayKey]: [] };

      const existing = parsed[arrayKey].find((i) => i[idField] === item[idField]);
      if (existing) {
        existing.quantity += 1;
      } else {
        parsed[arrayKey].push({ [idField]: item[idField], quantity: 1 });
      }

      localStorage.setItem(storageKey, JSON.stringify(parsed));
      setItemsCart([...parsed[arrayKey]]);
      toast.success(message);
    } else {
      handleAddOneElementToCart(item, activeCart, setElementsInCart);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : { [arrayKey]: [] };
    setItemsCart([...parsed[arrayKey]]);
  }, [storageKey, arrayKey]);

  return { addItemToCart, itemsCart, setItemsCart };
}

export default useAddItemToCart;
