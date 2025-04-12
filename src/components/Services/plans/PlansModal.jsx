import useGetAllPlans from "../../../hooks/useGetAllPlans";
import PlanCard from "./PlanCard";
import PlanHeader from "./PlanHeader";
import { IoMdClose } from "react-icons/io";
import "./PlansModal.css";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_HOST } from "../../../api/data";
import { toast } from "sonner";

function PlansModal({ handleOpenSmartPlanModal, user }) {
  const { plans, setPlans, plansError, plansLoading } = useGetAllPlans();

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

  return (
    <div className="plans-modal_container">
      <section>
        <IoMdClose className="close-icon" onClick={handleOpenSmartPlanModal} />
        {plans?.purchasedPlans?.length > 0 && (
          <>
            <PlanHeader title="Mis Planes" />
            <div className="purchased-plans plans-section">
              {plans?.purchasedPlans?.map((plan) => (
                <PlanCard
                  key={`plan-${plan.planId}`}
                  type="adquired"
                  title={plan.title}
                  image={plan.image}
                  id={plan.planId}
                />
              ))}
            </div>
          </>
        )}

        {plans?.freePlans?.length > 0 && (
          <>
            <PlanHeader title="Gratis" />
            <div className="free-plans plans-section">
              {plans?.freePlans?.map((plan) => (
                <PlanCard
                  key={`plan-${plan.planId}`}
                  type="free"
                  title={plan.title}
                  image={plan.image}
                  id={plan.planId}
                />
              ))}
            </div>
          </>
        )}

        {plans?.notPurchasedPlans?.length > 0 && (
          <>
            <PlanHeader title="Planes Premium" />
            <div className="premium-plans plans-section">
              {plans?.notPurchasedPlans?.map((plan) => (
                <PlanCard
                  key={`plan-${plan.planId}`}
                  type="premium"
                  title={plan.title}
                  image={plan.image}
                  price={plan.price}
                  isOffer={plan.isOffer}
                  id={plan.planId}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default PlansModal;
