import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function usePurchasePlan() {
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePurchasePlan = async (planId) => {
    setLoadingPlanId(planId);
    setPaymentLoading(true);

    try {
      const { data } = await apiClient.post(`/plan/${planId}/purchase`);
      window.open(data.init_point, "_blank");
    } catch (error) {
      if (error?.response?.data?.message === "Usuario bloqueado") {
        toast.error("Tu cuenta se encuentra suspendida. No podés realizar compras.");
      } else {
        toast.error("Ocurrió un error al procesar el pago");
      }
    } finally {
      setLoadingPlanId(null);
      setPaymentLoading(false);
    }
  };

  return { handlePurchasePlan, paymentLoading, loadingPlanId };
}

export default usePurchasePlan;
