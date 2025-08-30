import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function usePurchaseResource() {
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePurchaseResource = async (resourceId) => {
    const token = localStorage.getItem("authToken");
    setPaymentLoading(true);
    try {
      const response = await fetch(`${HOST}/resource/${resourceId}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al procesar la compra");
      }

      const data = await response.json();

      window.open(data.init_point, "_blank");
    } catch (error) {
      toast.error("Ocurrio un error al procesar el pago");
    } finally {
      setPaymentLoading(false);
    }
  };

  return {handlePurchaseResource, paymentLoading};
}

export default usePurchaseResource;
