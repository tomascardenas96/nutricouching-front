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
      const { data } = await apiClient.post("/mercadopago/preference", elementsInCart);

      handleCreateOrder(activeCart?.cartId, total);

      if (createOrderError) {
        toast.error("Error al crear una orden de compra");
        return;
      }

      window.location.href = data.init_point;
    } catch (error) {
      console.error(error);
    } finally {
      setPreferenceLoading(false);
    }
  };

  return { handleCreatePreference, preferenceLoading, createOrderError };
}

export default useCreatePreferenceMP;
