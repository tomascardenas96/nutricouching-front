import { useEffect, useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";
import useCreateOrder from "../hooks/useCreateOrder";

function useCreatePreferenceMP(elementsInCart, activeCart) {
  const [preferenceLoading, setPreferenceLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const { handleCreateOrder, createOrderError } = useCreateOrder();

  useEffect(() => {
    if (!!elementsInCart) {
      const calculateTotal = elementsInCart.reduce(
        (acc, element) =>
          acc + element?.product?.price * element.quantity ||
          acc + element?.viand?.price * element.quantity,
        0
      );

      setTotal(calculateTotal);
    }
  }, [elementsInCart]);

  const handleCreatePreference = async (elementsInCart) => {
    setPreferenceLoading(true);
    try {
      const cartId = activeCart?.cartId;
      const body = elementsInCart.map(({ cartItemId, product, viand, quantity }) => ({
        cartItemId,
        cart: { cartId },
        ...(product ? { product } : {}),
        ...(viand ? { viand } : {}),
        quantity,
      }));

      const { data } = await apiClient.post("/mercadopago/preference", body);

      handleCreateOrder(cartId, total);

      if (createOrderError) {
        toast.error("Error al crear una orden de compra");
        return;
      }

      window.open(data.init_point, "_blank");
    } catch (error) {
      console.error(error);
    } finally {
      setPreferenceLoading(false);
    }
  };

  return { handleCreatePreference, preferenceLoading, createOrderError };
}

export default useCreatePreferenceMP;
