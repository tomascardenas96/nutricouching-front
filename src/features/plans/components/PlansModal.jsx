import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { WEBSOCKET_HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import useGetAllPlans from "../../plans/hooks/useGetAllPlans";
import PlanCard from "./PlanCard";
import PlanHeader from "./PlanHeader";
import "./PlansModal.css";
import MoreInfoPlan from "./more-info/MoreInfoPlan";
import useDownloadPlan from "../hooks/useDownloadPlan";
import usePurchasePlan from "../hooks/usePurchasePlan";
import { useLoginModal } from "../../auth/hooks/useLoginModal";

function PlansModal({ handleOpenSmartPlanModal, setSelectedService }) {
  const { user } = useAuthUser();
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { handleLoginModal } = useLoginModal();

  const { plans, setPlans, plansError, plansLoading } = useGetAllPlans(
    user,
    selectedPlan,
    setSelectedPlan,
    setIsMoreInfoModalOpen
  );

  // Download and purchase plans
  const { handleDownloadPlan, downloadLoading } = useDownloadPlan();
  const { handlePurchasePlan, paymentLoading } = usePurchasePlan();

  const handleOpenMoreInfoModal = () => {
    setIsMoreInfoModalOpen(!isMoreInfoModalOpen);
  };

  return (
    <div className="plans-modal_container">
      <section>
        <IoMdClose className="close-icon" onClick={handleOpenSmartPlanModal} />
        {plans?.purchasedPlans?.length > 0 && (
          <>
            <PlanHeader title="Tu Colección" />
            <div className="purchased-plans plans-section">
              {plans?.purchasedPlans?.map((plan) => (
                <PlanCard
                  key={`plan-${plan.planId}`}
                  type="adquired"
                  title={plan.title}
                  image={plan.image}
                  id={plan.planId}
                  handleOpenMoreInfoModal={handleOpenMoreInfoModal}
                  isMoreInfoModalOpen={isMoreInfoModalOpen}
                  shortDescription={plan.shortDescription}
                  description={plan.description}
                  weight={plan.weight}
                  date={plan.createdAt}
                  plan={plan}
                  setSelectedPlan={setSelectedPlan}
                  status="adquired"
                  handleDownloadPlan={handleDownloadPlan}
                  downloadLoading={downloadLoading}
                  handlePurchasePlan={handlePurchasePlan}
                  paymentLoading={paymentLoading}
                  user={user}
                  handleLoginModal={handleLoginModal}
                  setSelectedService={setSelectedService}
                  handleOpenSmartPlanModal={handleOpenSmartPlanModal}
                />
              ))}
            </div>
          </>
        )}

        {plans?.freePlans?.length > 0 && (
          <>
            <PlanHeader title="Gratuitos" />
            <div className="free-plans plans-section">
              {plans?.freePlans?.map((plan) => (
                <PlanCard
                  key={`plan-${plan.planId}`}
                  type="free"
                  title={plan.title}
                  image={plan.image}
                  id={plan.planId}
                  handleOpenMoreInfoModal={handleOpenMoreInfoModal}
                  isMoreInfoModalOpen={isMoreInfoModalOpen}
                  shortDescription={plan.shortDescription}
                  description={plan.description}
                  weight={plan.weight}
                  date={plan.createdAt}
                  plan={plan}
                  setSelectedPlan={setSelectedPlan}
                  status="adquired"
                  handleDownloadPlan={handleDownloadPlan}
                  downloadLoading={downloadLoading}
                  handlePurchasePlan={handlePurchasePlan}
                  paymentLoading={paymentLoading}
                  user={user}
                  handleLoginModal={handleLoginModal}
                  setSelectedService={setSelectedService}
                  handleOpenSmartPlanModal={handleOpenSmartPlanModal}
                />
              ))}
            </div>
          </>
        )}

        {plans?.notPurchasedPlans?.length > 0 && (
          <>
            <PlanHeader title="Más Planes" />
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
                  handleOpenMoreInfoModal={handleOpenMoreInfoModal}
                  isMoreInfoModalOpen={isMoreInfoModalOpen}
                  shortDescription={plan.shortDescription}
                  description={plan.description}
                  weight={plan.weight}
                  date={plan.createdAt}
                  plan={plan}
                  setSelectedPlan={setSelectedPlan}
                  status="not-purchased"
                  handleDownloadPlan={handleDownloadPlan}
                  downloadLoading={downloadLoading}
                  handlePurchasePlan={handlePurchasePlan}
                  paymentLoading={paymentLoading}
                  user={user}
                  handleLoginModal={handleLoginModal}
                  setSelectedService={setSelectedService}
                  handleOpenSmartPlanModal={handleOpenSmartPlanModal}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {isMoreInfoModalOpen &&
        createPortal(
          <MoreInfoPlan
            image={selectedPlan.image}
            title={selectedPlan.title}
            shortDescription={selectedPlan.shortDescription}
            description={selectedPlan.description}
            price={selectedPlan.price}
            weight={selectedPlan.weight}
            date={selectedPlan.date}
            handleOpenMoreInfoModal={handleOpenMoreInfoModal}
            setSelectedPlan={setSelectedPlan}
            status={selectedPlan.status}
            handleDownloadPlan={handleDownloadPlan}
            downloadLoading={downloadLoading}
            handlePurchasePlan={handlePurchasePlan}
            paymentLoading={paymentLoading}
            id={selectedPlan.planId}
          />,
          document.body
        )}
    </div>
  );
}

export default PlansModal;
