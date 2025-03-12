import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../api/data";
import useCreateOrder from "./useCreateOrder";

function useCreatePreferenceMP(elementsInCart, activeCart) {
  const [preferenceLoading, setPreferenceLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const authToken = localStorage.getItem("authToken");

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
      const response = await fetch(`${HOST}/mercadopago/preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(elementsInCart),
      });

      const data = await response.json();

      handleCreateOrder(activeCart?.cartId, total);

      if (createOrderError || !response.ok) {
        toast.error("Error al crear una orden de compra");
        return;
      }

      // Abrir Mercado Pago en una nueva pestaña
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
