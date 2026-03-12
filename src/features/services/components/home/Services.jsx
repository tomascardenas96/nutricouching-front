import { useState } from "react";
import { createPortal } from "react-dom";
import { PiStarFourLight } from "react-icons/pi";
import GuideModal from "../../../custom-guide/components/home/GuideModal";
import PlansModal from "../../../plans/components/PlansModal";
import ResourcesModal from "../../../resources/components/ResourcesModal";
import { services } from "../../data/services";
import "./Services.css";
import ServiceCard from "./ServicesCard";

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isSmartPlanModalOpen, setIsSmartPlanModalOpen] = useState(false);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleOpenSmartPlanModal = () => {
    setIsSmartPlanModalOpen((prev) => !prev);
  };

  return (
    <div className="services-strip">
      {/* Celda header */}
      <div className="services-strip__header">
        <PiStarFourLight className="services-strip__star services-strip__star--sm" />
        <span>Nuestra Lista de Servicios</span>
        <PiStarFourLight className="services-strip__star services-strip__star--lg" />
      </div>

      {/* Celdas de servicios */}
      {services.map((service) => (
        <ServiceCard
          key={service.serviceId}
          title={service.title}
          description={service.description}
          type={service.type}
          handleSelectServiceAndOpenModal={() => {
            handleSelectService(service);
            handleOpenSmartPlanModal();
          }}
        />
      ))}

      {selectedService?.type === "plan_download" && isSmartPlanModalOpen &&
        createPortal(
          <PlansModal
            handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            setSelectedService={setSelectedService}
          />,
          document.getElementById("root")
        )}

      {selectedService?.type === "resource_download" && isSmartPlanModalOpen &&
        createPortal(
          <ResourcesModal
            handleOpenSmartPlanModal={handleOpenSmartPlanModal}
            setSelectedService={setSelectedService}
          />,
          document.getElementById("root")
        )}

      {selectedService?.type === "guide" && isSmartPlanModalOpen &&
        createPortal(
          <GuideModal setOpen={setIsSmartPlanModalOpen} />,
          document.getElementById("root")
        )}
    </div>
  );
}

export default Services;
