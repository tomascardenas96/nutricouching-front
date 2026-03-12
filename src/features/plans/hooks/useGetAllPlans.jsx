import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import { useSSEEvent } from "../../../services/useSSEEvent";
import apiClient from "../../auth/api/apiClient";

function useGetAllPlans(setSelectedPlan, setIsMoreInfoModalOpen) {
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const getPlans = async () => {
      if (user) {
        getPlansWhenLoggedIn();
      } else {
        getPlansWhenLoggedOut();
      }
    };

    getPlans();
  }, [user]);

  useSSEEvent("purchasedPlan", (planId) => {
    toast.success("El plán ha sido agregado a tu colección");
    setPlans((prev) => {
      const justPurchasedPlan = prev.notPurchasedPlans?.find(
        (plan) => plan.planId === planId
      );
      const notPurchasedPlans = prev.notPurchasedPlans?.filter(
        (plan) => plan.planId !== planId
      ) ?? [];
      setSelectedPlan(null);
      setIsMoreInfoModalOpen(false);
      return {
        freePlans: prev.freePlans,
        purchasedPlans: [...(prev.purchasedPlans ?? []), justPurchasedPlan].filter(Boolean),
        notPurchasedPlans,
      };
    });
  });

  const getPlansWhenLoggedIn = async () => {
    try {
      const { data } = await apiClient.get("/plan");
      setPlans(data);
    } catch (error) {
      setPlansError(true);
    } finally {
      setPlansLoading(false);
    }
  };

  const getPlansWhenLoggedOut = async () => {
    try {
      const { data } = await apiClient.get("/plan/all");
      setPlans(data);
    } catch (error) {
      setPlansError(true);
    } finally {
      setPlansLoading(false);
    }
  };

  const flattedPlans = [
    ...(plans?.freePlans || []),
    ...(plans?.notPurchasedPlans || []),
    ...(plans?.purchasedPlans || []),
  ];

  return { plans, setPlans, plansLoading, plansError, flattedPlans };
}

export default useGetAllPlans;
