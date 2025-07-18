import { useState } from "react";
import { createPortal } from "react-dom";
import useDownloadPlan from "../../../plans/hooks/useDownloadPlan";
import useGetServices from "../../hooks/useGetServices";
import usePurchasePlan from "../../../plans/hooks/usePurchasePlan";
import NetworkError from "../../../../common/components/NetworkError";
import MoreInfo from "../../../Bookings/components/modals/MoreInfo";
import "./Services.css";
import ServiceCard from "./ServicesCard";
import PlansModal from "../../../plans/components/PlansModal";
import ServicesLoading from "./loader/ServicesLoading";

function Services() {
  // Selected service state
  const [selectedService, setSelectedService] = useState(null);

  // Modal states
  const [isRequestReservationOpen, setIsRequestReservationOpen] =
    useState(false);
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [isSmartPlanModalOpen, setIsSmartPlanModalOpen] = useState(false);

  // Get services
  const { services, servicesLoading, servicesError } = useGetServices();

  // Download and purchase plans
  const { handleDownloadPlan, downloadLoading } = useDownloadPlan();
  const { handlePurchasePlan, paymentLoading } = usePurchasePlan();

  // Handle select service
  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  // Handle open modals
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
      <div className="services-list_container">
        {servicesLoading && <ServicesLoading />}

        {!servicesError &&
          !servicesLoading &&
          services?.map((service, idx) => (
            <ServiceCard
              key={service?.serviceId}
              image={service?.image}
              color={colors[idx]}
              title={service?.title}
              description={service?.description}
              handleSelectService={() => handleSelectService(service)}
              handleOpenServiceModal={handleOpenServiceModal}
              handleOpenRequestReservation={handleOpenRequestReservation}
              type={service?.type}
              handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            />
          ))}

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
            selectedService={selectedService}
            setIsRequestReservationOpen={setIsRequestReservationOpen}
            isRequestReservationOpen={isRequestReservationOpen}
          />,
          document.getElementById("root")
        )}

      {selectedService?.type === "plan_download" &&
        isSmartPlanModalOpen &&
        createPortal(
          <PlansModal
            handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            handleDownloadPlan={handleDownloadPlan}
            downloadLoading={downloadLoading}
            handlePurchasePlan={handlePurchasePlan}
            paymentLoading={paymentLoading}
            setSelectedService={setSelectedService}
          />,
          document.getElementById("root")
        )}
    </div>
  );
}

export default Services;
