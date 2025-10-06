import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import { useLoginModal } from "../../auth/hooks/useLoginModal";
import useDownloadResource from "../hooks/useDownloadResource";
import useGetAllResources from "../hooks/useGetAllResources";
import usePurchaseResource from "../hooks/usePurchaseResource";
import MoreInfoResource from "./more-info/MoreInfoResource";
import ResourceCard from "./ResourceCard";
import PlanHeader from "./ResourceHeader";
import "./ResourcesModal.css";

function ResourcesModal({ handleOpenSmartPlanModal, setSelectedService }) {
  const { user } = useAuthUser();
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const { handleLoginModal } = useLoginModal();

  const { resources } = useGetAllResources(
    setSelectedResource,
    setIsMoreInfoModalOpen
  );

  // Download and purchase plans
  const { handleDownloadResource, downloadLoading } = useDownloadResource();
  const { handlePurchaseResource, loadingResourceId, paymentLoading } =
    usePurchaseResource();

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
                  setSelectedResource={setSelectedResource}
                  status="adquired"
                  handleDownloadResource={handleDownloadResource}
                  downloadLoading={downloadLoading}
                  handlePurchaseResource={handlePurchaseResource}
                  loadingResourceId={loadingResourceId}
                  user={user}
                  handleLoginModal={handleLoginModal}
                  setSelectedService={setSelectedService}
                  handleOpenSmartPlanModal={handleOpenSmartPlanModal}
                  paymentLoading={paymentLoading}
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
                  setSelectedResource={setSelectedResource}
                  status="adquired"
                  handleDownloadResource={handleDownloadResource}
                  downloadLoading={downloadLoading}
                  handlePurchaseResource={handlePurchaseResource}
                  loadingResourceId={loadingResourceId}
                  user={user}
                  handleLoginModal={handleLoginModal}
                  setSelectedService={setSelectedService}
                  handleOpenSmartPlanModal={handleOpenSmartPlanModal}
                  paymentLoading={paymentLoading}
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
                  setSelectedResource={setSelectedResource}
                  status="not-purchased"
                  handleDownloadResource={handleDownloadResource}
                  downloadLoading={downloadLoading}
                  handlePurchaseResource={handlePurchaseResource}
                  loadingResourceId={loadingResourceId}
                  user={user}
                  handleLoginModal={handleLoginModal}
                  setSelectedService={setSelectedService}
                  handleOpenSmartPlanModal={handleOpenSmartPlanModal}
                  paymentLoading={paymentLoading}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {isMoreInfoModalOpen &&
        createPortal(
          <MoreInfoResource
            image={selectedResource.image}
            title={selectedResource.title}
            shortDescription={selectedResource.shortDescription}
            description={selectedResource.description}
            price={selectedResource.price}
            weight={selectedResource.weight}
            date={selectedResource.date}
            handleOpenMoreInfoModal={handleOpenMoreInfoModal}
            setSelectedResource={setSelectedResource}
            status={selectedResource.status}
            handleDownloadResource={handleDownloadResource}
            downloadLoading={downloadLoading}
            handlePurchaseResource={handlePurchaseResource}
            loadingResourceId={loadingResourceId}
            id={selectedResource.resourceId}
            paymentLoading={paymentLoading}
          />,
          document.body
        )}
    </div>
  );
}

export default ResourcesModal;
