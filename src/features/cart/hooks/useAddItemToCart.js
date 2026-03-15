import { useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProductCart } from "./useProductsCart";
import { useViandsCart } from "./useViandsCart";
import useAddOneElementToCartWhenLoggedIn from "./useAddOneElementToCartWhenLoggedIn";

const CONFIG = {
  product: {
    storageKey: "products-cart",
    arrayKey: "products",
    idField: "productId",
    message: "Producto agregado al carrito",
  },
  viand: {
    storageKey: "viands-cart",
    arrayKey: "viands",
    idField: "viandId",
    message: "Vianda agregada al carrito",
  },
};

function useAddItemToCart(type, setElementsInCart) {
  const { storageKey, arrayKey, idField, message } = CONFIG[type];
  const { user } = useAuth();
  const { setProductsInCart } = useProductCart();
  const { setViandsInCart } = useViandsCart();
  const { handleAddOneElementToCart } = useAddOneElementToCartWhenLoggedIn();

  const setGuestCart = type === "product" ? setProductsInCart : setViandsInCart;

  const addItemToCart = useCallback(
    (item) => {
      if (!user) {
        setGuestCart((prev) => {
          const exists = prev.find((i) => i[idField] === item[idField]);
          const updated = exists
            ? prev.map((i) =>
                i[idField] === item[idField]
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...prev, { ...item, quantity: 1 }];
          localStorage.setItem(storageKey, JSON.stringify({ [arrayKey]: updated }));
          return updated;
        });
        toast.success(message);
      } else {
        handleAddOneElementToCart(item, setElementsInCart);
      }
    },
    [user, setGuestCart, idField, storageKey, arrayKey, message, handleAddOneElementToCart, setElementsInCart]
  );

  return { addItemToCart };
}

export default useAddItemToCart;
