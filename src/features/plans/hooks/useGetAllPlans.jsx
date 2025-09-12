import { useEffect, useState } from "react";
import { HOST, WEBSOCKET_HOST } from "../../../api/data";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useGetAllPlans(setSelectedPlan, setIsMoreInfoModalOpen) {
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState(null);

  const { user } = useAuthUser();

  useEffect(() => {
    const getPlans = async () => {
      if (user) {
        const token = localStorage.getItem("authToken");
        getPlansWhenLoggedIn(token);
      } else {
        getPlansWhenLoggedOut();
      }
    };

    getPlans();
  }, [user]);

  useEffect(() => {
    if (!user || plans.length === 0) {
      return;
    }

    const socket = io(`${WEBSOCKET_HOST}`, {
      query: { userId: user.userId },
    });

    socket.on("purchasedPlan", (planId) => {
      toast.success("El plán ha sido agregado a tu colección");

      setPlans((prev) => {
        const justPurchasedPlan = prev.notPurchasedPlans.find(
          (plan) => plan.planId === planId
        );
        prev.purchasedPlans.push(justPurchasedPlan);

        const notPurchasedPlans = prev.notPurchasedPlans.filter(
          (plan) => plan.planId !== planId
        );

        setSelectedPlan(null);
        setIsMoreInfoModalOpen(false);

        return {
          freePlans: prev.freePlans,
          purchasedPlans: prev.purchasedPlans,
          notPurchasedPlans,
        };
      });
    });

    return () => {
      socket.off("purchasedPlan");
      socket.disconnect();
    };
  }, [user, plans]);

  const getPlansWhenLoggedIn = async (token) => {
    try {
      const response = await fetch(`${HOST}/plan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setPlans(data);
    } catch (error) {
      setPlansError(true);
    } finally {
      setPlansLoading(false);
    }
  };

  const getPlansWhenLoggedOut = async () => {
    try {
      const response = await fetch(`${HOST}/plan/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

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
