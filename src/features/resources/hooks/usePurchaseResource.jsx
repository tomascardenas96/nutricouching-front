import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function usePurchaseResource() {
  const [loadingResourceId, setLoadingResourceId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePurchaseResource = async (resourceId) => {
    setLoadingResourceId(resourceId);
    setPaymentLoading(true);

    try {
      const { data } = await apiClient.post(`/resource/${resourceId}/purchase`);
      window.open(data.init_point, "_blank");
    } catch (error) {
      if (error?.response?.data?.message === "Usuario bloqueado") {
        toast.error("Tu cuenta se encuentra suspendida. No podés realizar compras.");
      } else {
        toast.error("Ocurrió un error al procesar el pago");
      }
    } finally {
      setLoadingResourceId(null);
      setPaymentLoading(false);
    }
  };

  return { handlePurchaseResource, loadingResourceId, paymentLoading };
}

export default usePurchaseResource;
