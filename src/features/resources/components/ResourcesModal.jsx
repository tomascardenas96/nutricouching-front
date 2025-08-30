import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import { useLoginModal } from "../../auth/hooks/useLoginModal";
import useDownloadResource from "../hooks/useDownloadResource";
import useGetAllResources from "../hooks/useGetAllResources";
import usePurchaseResource from "../hooks/usePurchaseResource";
import PlanCard from "./ResourceCard";
import PlanHeader from "./ResourceHeader";
import "./ResourcesModal.css";
import MoreInfoPlan from "./more-info/MoreInfoPlan";
import ResourceCard from "./ResourceCard";

function ResourcesModal({ handleOpenSmartPlanModal, setSelectedService }) {
  const { user } = useAuthUser();
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [selectedResource, setSelectedResources] = useState(null);
  const { handleLoginModal } = useLoginModal();

  const { resources } = useGetAllResources(
    setSelectedResources,
    setIsMoreInfoModalOpen
  );

  // Download and purchase plans
  const { handleDownloadResource, downloadLoading } = useDownloadResource();
  const { handlePurchaseResource, paymentLoading } = usePurchaseResource();

  const handleOpenMoreInfoModal = () => {
    setIsMoreInfoModalOpen(!isMoreInfoModalOpen);
  };

  return (
    <div className="plans-modal_container">
      <section>
        <IoMdClose className="close-icon" onClick={handleOpenSmartPlanModal} />
        {resources?.purchasedPlans?.length > 0 && (
          <>
            <PlanHeader title="Tu Colección" />
            <div className="purchased-plans plans-section">
              {resources?.purchasedPlans?.map((resource) => (
                <ResourceCard
                  key={`resource-${resource.resourceId}`}
                  type="adquired"
                  title={resource.title}
                  image={resource.image}
                  id={resource.resourceId}
                  handleOpenMoreInfoModal={handleOpenMoreInfoModal}
                  isMoreInfoModalOpen={isMoreInfoModalOpen}
                  shortDescription={resource.shortDescription}
                  description={resource.description}
                  weight={resource.weight}
                  date={resource.createdAt}
                  resource={resource}
                  setSelectedResources={setSelectedResources}
                  status="adquired"
                  handleDownloadResource={handleDownloadResource}
                  downloadLoading={downloadLoading}
                  handlePurchaseResource={handlePurchaseResource}
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

        {resources?.freePlans?.length > 0 && (
          <>
            <PlanHeader title="Gratuitos" />
            <div className="free-plans plans-section">
              {resources?.freePlans?.map((resource) => (
                <ResourceCard
                  key={`resource-${resource.resourceId}`}
                  type="free"
                  title={resource.title}
                  image={resource.image}
                  id={resource.resourceId}
                  handleOpenMoreInfoModal={handleOpenMoreInfoModal}
                  isMoreInfoModalOpen={isMoreInfoModalOpen}
                  shortDescription={resource.shortDescription}
                  description={resource.description}
                  weight={resource.weight}
                  date={resource.createdAt}
                  resource={resource}
                  setSelectedResources={setSelectedResources}
                  status="adquired"
                  handleDownloadResource={handleDownloadResource}
                  downloadLoading={downloadLoading}
                  handlePurchaseResource={handlePurchaseResource}
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

        {resources?.notPurchasedPlans?.length > 0 && (
          <>
            <PlanHeader title="Más Planes" />
            <div className="premium-plans plans-section">
              {resources?.notPurchasedPlans?.map((resource) => (
                <ResourceCard
                  key={`resource-${resource.resourceId}`}
                  type="premium"
                  title={resource.title}
                  image={resource.image}
                  price={resource.price}
                  isOffer={resource.isOffer}
                  id={resource.resourceId}
                  handleOpenMoreInfoModal={handleOpenMoreInfoModal}
                  isMoreInfoModalOpen={isMoreInfoModalOpen}
                  shortDescription={resource.shortDescription}
                  description={resource.description}
                  weight={resource.weight}
                  date={resource.createdAt}
                  resource={resource}
                  setSelectedResources={setSelectedResources}
                  status="not-purchased"
                  handleDownloadResource={handleDownloadResource}
                  downloadLoading={downloadLoading}
                  handlePurchaseResource={handlePurchaseResource}
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
            image={selectedResource.image}
            title={selectedResource.title}
            shortDescription={selectedResource.shortDescription}
            description={selectedResource.description}
            price={selectedResource.price}
            weight={selectedResource.weight}
            date={selectedResource.date}
            handleOpenMoreInfoModal={handleOpenMoreInfoModal}
            setSelectedResources={setSelectedResources}
            status={selectedResource.status}
            handleDownloadResource={handleDownloadResource}
            downloadLoading={downloadLoading}
            handlePurchaseResource={handlePurchaseResource}
            paymentLoading={paymentLoading}
            id={selectedResource.resourceId}
          />,
          document.body
        )}
    </div>
  );
}

export default ResourcesModal;
