import { useEffect, useState } from "react";
import { HOST } from "../api/data";
import useCreateOrder from "./useCreateOrder";
import { toast } from "sonner";
import { useActiveCart } from "../context/UserProvider";

function useCreatePreferenceMP(productsInCart, user) {
  const [preferenceLoading, setPreferenceLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const { activeCart } = useActiveCart();

  const { handleCreateOrder, createOrderError } = useCreateOrder();

  useEffect(() => {
    if (!!productsInCart) {
      const calculateTotal = productsInCart.reduce(
        (acc, element) =>
          acc + element?.product?.price * element.quantity ||
          acc + element?.viand?.price * element.quantity,
        0
      );

      setTotal(calculateTotal);
    }
  }, [productsInCart]);

  const handleCreatePreference = async (productsInCart) => {
    setPreferenceLoading(true);
    try {
      const response = await fetch(`${HOST}/mercadopago/preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productsInCart),
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
