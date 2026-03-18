import { useEffect } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import { useSSEEvent } from "../../../services/useSSEEvent";
import apiClient from "../../auth/api/apiClient";

function useGetAllPlans(setSelectedPlan, setIsMoreInfoModalOpen) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: plans = null,
    isLoading: plansLoading,
    isError: plansError,
    refetch,
  } = useQuery({
    queryKey: ["plans", user?.userId],
    queryFn: () => apiClient.get("/plan/all").then((r) => r.data),
  });

  useEffect(() => {
    if (plansError) {
      toast.error("Error al cargar los planes");
    }
  }, [plansError]);

  const setPlans = (updater) =>
    queryClient.setQueryData(["plans", user?.userId], updater);

  useSSEEvent("purchasedPlan", (planId) => {
    toast.success("El plan ha sido agregado a tu colección");
    setPlans((prev) => {
      if (!prev) return prev;
      const justPurchasedPlan = prev.notPurchasedPlans?.find(
        (plan) => plan.planId === planId
      );
      const notPurchasedPlans =
        prev.notPurchasedPlans?.filter((plan) => plan.planId !== planId) ?? [];
      setSelectedPlan(null);
      setIsMoreInfoModalOpen(false);
      return {
        freePlans: prev.freePlans,
        purchasedPlans: [
          ...(prev.purchasedPlans ?? []),
          justPurchasedPlan,
        ].filter(Boolean),
        notPurchasedPlans,
      };
    });
  });

  const flattedPlans = [
    ...(plans?.freePlans || []),
    ...(plans?.notPurchasedPlans || []),
    ...(plans?.purchasedPlans || []),
  ];

  return { plans, setPlans, plansLoading, plansError, flattedPlans, refetch };
}

export default useGetAllPlans;
