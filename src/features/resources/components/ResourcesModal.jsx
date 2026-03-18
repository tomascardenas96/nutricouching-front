import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { MdErrorOutline, MdOutlineInventory2 } from "react-icons/md";
import { useAuth } from "../../auth/hooks/useAuth";
import useDownloadResource from "../hooks/useDownloadResource";
import useGetAllResources from "../hooks/useGetAllResources";
import usePurchaseResource from "../hooks/usePurchaseResource";
import MoreInfoResource from "./more-info/MoreInfoResource";
import ResourceCard from "./ResourceCard";
import PlanHeader from "./ResourceHeader";
import "./ResourcesModal.css";

function ResourcesSkeleton() {
  return (
    <div className="resources-skeleton">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="resources-skeleton__card">
          <div className="resources-skeleton__image" />
          <div className="resources-skeleton__body">
            <div className="resources-skeleton__line resources-skeleton__line--title" />
            <div className="resources-skeleton__line resources-skeleton__line--title-sm" />
            <div className="resources-skeleton__buttons">
              <div className="resources-skeleton__line resources-skeleton__line--btn" />
              <div className="resources-skeleton__line resources-skeleton__line--btn" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResourcesError({ onRetry }) {
  return (
    <div className="resources-state resources-state--error">
      <MdErrorOutline className="resources-state__icon" />
      <p className="resources-state__title">Error de conexión</p>
      <p className="resources-state__subtitle">
        No se pudieron cargar los recursos. Revisá tu conexión e intentá de nuevo.
      </p>
      <button className="resources-state__retry" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}

function ResourcesEmpty() {
  return (
    <div className="resources-state resources-state--empty">
      <MdOutlineInventory2 className="resources-state__icon" />
      <p className="resources-state__title">Sin recursos por ahora</p>
      <p className="resources-state__subtitle">
        Próximamente vas a encontrar guías y materiales descargables acá.
      </p>
    </div>
  );
}

function ResourcesModal({ handleOpenSmartPlanModal, setSelectedService }) {
  const { user } = useAuth();
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const { resources, resourcesLoading, resourcesError, refetch } = useGetAllResources(
    setSelectedResource,
    setIsMoreInfoModalOpen
  );

  const { handleDownloadResource, downloadLoading } = useDownloadResource();
  const { handlePurchaseResource, loadingResourceId, paymentLoading } = usePurchaseResource();

  const handleOpenMoreInfoModal = () => setIsMoreInfoModalOpen((prev) => !prev);

  const isEmpty =
    !resourcesLoading &&
    !resourcesError &&
    !resources?.purchasedResources?.length &&
    !resources?.freeResources?.length &&
    !resources?.notPurchasedResources?.length;

  const renderCard = (resource, type, status) => (
    <ResourceCard
      key={`resource-${resource.resourceId}`}
      type={type}
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
      status={status}
      handleDownloadResource={handleDownloadResource}
      downloadLoading={downloadLoading}
      handlePurchaseResource={handlePurchaseResource}
      loadingResourceId={loadingResourceId}
      user={user}
      setSelectedService={setSelectedService}
      handleOpenSmartPlanModal={handleOpenSmartPlanModal}
      paymentLoading={paymentLoading}
    />
  );

  return (
    <div className="resources-modal_container">
      <section>
        <IoMdClose className="close-icon" onClick={handleOpenSmartPlanModal} />

        {resourcesLoading && <ResourcesSkeleton />}

        {resourcesError && <ResourcesError onRetry={refetch} />}

        {isEmpty && <ResourcesEmpty />}

        {!resourcesLoading && !resourcesError && (
          <>
            {resources?.purchasedResources?.length > 0 && (
              <>
                <PlanHeader title="Tu Colección" />
                <div className="purchased-plans plans-section">
                  {resources.purchasedResources.map((r) => renderCard(r, "adquired", "adquired"))}
                </div>
              </>
            )}

            {resources?.freeResources?.length > 0 && (
              <>
                <PlanHeader title="Gratuitos" />
                <div className="free-plans plans-section">
                  {resources.freeResources.map((r) => renderCard(r, "free", "adquired"))}
                </div>
              </>
            )}

            {resources?.notPurchasedResources?.length > 0 && (
              <>
                <PlanHeader title="Más Planes" />
                <div className="premium-plans plans-section">
                  {resources.notPurchasedResources.map((r) => renderCard(r, "premium", "not-purchased"))}
                </div>
              </>
            )}
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
