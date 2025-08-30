import { useState } from "react";
import { createPortal } from "react-dom";
import MoreInfo from "../../../Bookings/components/modals/MoreInfo";
import PlansModal from "../../../plans/components/PlansModal";
import { services } from "../../data/services";
import "./Services.css";
import ServiceCard from "./ServicesCard";
import ResourcesModal from "../../../resources/components/ResourcesModal";

function Services() {
  // Selected service state
  const [selectedService, setSelectedService] = useState(null);

  // Modal states
  const [isRequestReservationOpen, setIsRequestReservationOpen] =
    useState(false);
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
  const [isSmartPlanModalOpen, setIsSmartPlanModalOpen] = useState(false);

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
  const colors = ["#BB4430", "#19647E", "#2F0147"];

  return (
    <div className="services-menu">
      <div className="services-list_container">
        {services?.map((service, idx) => (
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
      </div>

      {/* Mostrar modal si hay un servicio seleccionado */}
      {selectedService?.type === "plan_download" &&
        isSmartPlanModalOpen &&
        createPortal(
          <PlansModal
            handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            setSelectedService={setSelectedService}
          />,
          document.getElementById("root")
        )}

      {selectedService?.type === "resource_download" &&
        isSmartPlanModalOpen &&
        createPortal(
          <ResourcesModal
            handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            setSelectedService={setSelectedService}
          />,
          document.getElementById("root")
        )}
    </div>
  );
}

export default Services;
