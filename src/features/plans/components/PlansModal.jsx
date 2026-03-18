import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { MdErrorOutline, MdOutlineInventory2 } from "react-icons/md";
import { useAuth } from "../../auth/hooks/useAuth";
import useGetAllPlans from "../../plans/hooks/useGetAllPlans";
import useDownloadPlan from "../hooks/useDownloadPlan";
import usePurchasePlan from "../hooks/usePurchasePlan";
import PlanCard from "./PlanCard";
import PlanHeader from "./PlanHeader";
import "./PlansModal.css";
import MoreInfoPlan from "./more-info/MoreInfoPlan";

function PlansSkeleton() {
  return (
    <div className="plans-skeleton">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="plans-skeleton__card">
          <div className="plans-skeleton__image" />
          <div className="plans-skeleton__body">
            <div className="plans-skeleton__line plans-skeleton__line--title" />
            <div className="plans-skeleton__line plans-skeleton__line--title-sm" />
            <div className="plans-skeleton__buttons">
              <div className="plans-skeleton__line plans-skeleton__line--btn" />
              <div className="plans-skeleton__line plans-skeleton__line--btn" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlansError({ onRetry }) {
  return (
    <div className="plans-state plans-state--error">
      <MdErrorOutline className="plans-state__icon" />
      <p className="plans-state__title">Error de conexión</p>
      <p className="plans-state__subtitle">
        No se pudieron cargar los planes. Revisá tu conexión e intentá de nuevo.
      </p>
      <button className="plans-state__retry" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}

function PlansEmpty() {
  return (
    <div className="plans-state plans-state--empty">
      <MdOutlineInventory2 className="plans-state__icon" />
      <p className="plans-state__title">Sin planes por ahora</p>
      <p className="plans-state__subtitle">
        Próximamente vas a encontrar planes descargables acá.
      </p>
    </div>
  );
}

function PlansModal({ handleOpenSmartPlanModal, setSelectedService }) {
  const { user } = useAuth();
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { plans, plansLoading, plansError, refetch } = useGetAllPlans(
    setSelectedPlan,
    setIsMoreInfoModalOpen
  );

  const { handleDownloadPlan, downloadLoading } = useDownloadPlan();
  const { handlePurchasePlan, paymentLoading, loadingPlanId } = usePurchasePlan();

  const handleOpenMoreInfoModal = () => setIsMoreInfoModalOpen((prev) => !prev);

  const isEmpty =
    !plansLoading &&
    !plansError &&
    !plans?.purchasedPlans?.length &&
    !plans?.freePlans?.length &&
    !plans?.notPurchasedPlans?.length;

  const renderCard = (plan, type, status) => (
    <PlanCard
      key={`plan-${plan.planId}`}
      type={type}
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
      status={status}
      handleDownloadPlan={handleDownloadPlan}
      downloadLoading={downloadLoading}
      handlePurchasePlan={handlePurchasePlan}
      paymentLoading={paymentLoading}
      user={user}
      setSelectedService={setSelectedService}
      handleOpenSmartPlanModal={handleOpenSmartPlanModal}
      loadingPlanId={loadingPlanId}
    />
  );

  return (
    <div className="plans-modal_container">
      <section>
        <IoMdClose className="close-icon" onClick={handleOpenSmartPlanModal} />

        {plansLoading && <PlansSkeleton />}

        {plansError && <PlansError onRetry={refetch} />}

        {isEmpty && <PlansEmpty />}

        {!plansLoading && !plansError && (
          <>
            {plans?.purchasedPlans?.length > 0 && (
              <>
                <PlanHeader title="Tu Colección" />
                <div className="purchased-plans plans-section">
                  {plans.purchasedPlans.map((plan) => renderCard(plan, "adquired", "adquired"))}
                </div>
              </>
            )}

            {plans?.freePlans?.length > 0 && (
              <>
                <PlanHeader title="Gratuitos" />
                <div className="free-plans plans-section">
                  {plans.freePlans.map((plan) => renderCard(plan, "free", "adquired"))}
                </div>
              </>
            )}

            {plans?.notPurchasedPlans?.length > 0 && (
              <>
                <PlanHeader title="Más Planes" />
                <div className="premium-plans plans-section">
                  {plans.notPurchasedPlans.map((plan) => renderCard(plan, "premium", "not-purchased"))}
                </div>
              </>
            )}
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
            loadingPlanId={loadingPlanId}
          />,
          document.body
        )}
    </div>
  );
}

export default PlansModal;
