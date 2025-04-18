import { useState } from "react";
import { createPortal } from "react-dom";
import useDownloadPlan from "../../hooks/useDownloadPlan";
import useGetServices from "../../hooks/useGetServices";
import usePurchasePlan from "../../hooks/usePurchasePlan";
import LoaderSpinner from "../Common/LoaderSpinner";
import NetworkError from "../Common/NetworkError";
import MoreInfo from "./MoreInfo";
import "./Services.css";
import ServiceCard from "./ServicesCard";
import PlansModal from "./plans/PlansModal";

function Services({ handleLoginModal, user }) {
  const { services, servicesLoading, servicesError } = useGetServices();
  const [selectedService, setSelectedService] = useState(null);

  const { handleDownloadPlan, downloadLoading } = useDownloadPlan();
  const { handlePurchasePlan, paymentLoading } = usePurchasePlan();

  const [isRequestReservationOpen, setIsRequestReservationOpen] =
    useState(false);
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [isSmartPlanModalOpen, setIsSmartPlanModalOpen] = useState(false);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleOpenServiceModal = () => {
    setIsMoreInfoModalOpen(!isMoreInfoModalOpen);
  };

  const handleOpenRequestReservation = () => {
    setIsRequestReservationOpen(!isRequestReservationOpen);
  };

  const handleOpenSmartPlanModal = () => {
    setIsSmartPlanModalOpen(!isSmartPlanModalOpen);
  };

  // Colors to iterate
  const colors = ["#BB4430", "#19647E", "#2F0147", "#FC9F5B"];

  return (
    <div className="services-menu">
      <div className="title">
        <h1>
          Nuestros servicios disponibles, donde podrás obtener un asesoramiento
          completo.
        </h1>
      </div>
      <div className="services-list_container">
        {servicesLoading &&
          [...Array(4)].map((_, index) => (
            <div
              key={`services-loader_${index}`}
              className="loader-spinner_services"
            >
              <LoaderSpinner />
            </div>
          ))}

        {!servicesError &&
          !servicesLoading &&
          services?.map((service, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <ServiceCard
                key={service?.serviceId}
                image={service?.image}
                color={colors[idx]}
                title={service?.title}
                description={service?.description}
                handleSelectService={() => handleSelectService(service)}
                handleOpenServiceModal={handleOpenServiceModal}
                handleOpenRequestReservation={handleOpenRequestReservation}
                isEven={isEven}
                type={service?.type}
                handleOpenSmartPlanModal={handleOpenSmartPlanModal}
              />
            );
          })}

        {servicesError && (
          <div className="network-error_services">
            <NetworkError message="Ocurrio un error al cargar el contenido" />
          </div>
        )}
      </div>

      {/* Mostrar modal si hay un servicio seleccionado */}
      {selectedService?.type === "schedule" &&
        isMoreInfoModalOpen &&
        createPortal(
          <MoreInfo
            handleOpenRequestReservation={handleOpenRequestReservation}
            title={selectedService?.title}
            description={selectedService?.description}
            image={selectedService?.image}
            handleOpenServiceModal={handleOpenServiceModal}
            handleLoginModal={handleLoginModal}
            selectedService={selectedService}
            setIsRequestReservationOpen={setIsRequestReservationOpen}
            isRequestReservationOpen={isRequestReservationOpen}
          />,
          document.body
        )}

      {selectedService?.type === "plan_download" &&
        isSmartPlanModalOpen &&
        createPortal(
          <PlansModal
            handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            user={user}
            handleDownloadPlan={handleDownloadPlan}
            downloadLoading={downloadLoading}
            handlePurchasePlan={handlePurchasePlan}
            paymentLoading={paymentLoading}
          />,
          document.body
        )}
    </div>
  );
}

export default Services;
