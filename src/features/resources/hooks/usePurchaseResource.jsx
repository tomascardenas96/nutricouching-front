import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function usePurchaseResource() {
  const [loadingResourceId, setLoadingResourceId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePurchaseResource = async (resourceId) => {
    const token = localStorage.getItem("authToken");
    setLoadingResourceId(resourceId);
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
      setLoadingResourceId(null);
      setPaymentLoading(false);
    }
  };

  return { handlePurchaseResource, loadingResourceId, paymentLoading };
}

export default usePurchaseResource;
