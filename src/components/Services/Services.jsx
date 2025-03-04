import { useState } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { RiFootprintFill, RiMentalHealthLine } from "react-icons/ri";
import useGetServices from "../../hooks/useGetServices";
import MoreInfo from "./MoreInfo";
import ReservationModal from "./ReservationModal";
import "./Services.css";
import ServiceCard from "./ServicesCard";

function Services({ handleLoginModal }) {
  const { services, servicesLoading, servicesError } = useGetServices();
  const [selectedService, setSelectedService] = useState(null);

  const [isRequestReservationOpen, setIsRequestReservationOpen] =
    useState(false);
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleOpenServiceModal = () => {
    setIsMoreInfoModalOpen(!isMoreInfoModalOpen);
  };

  const handleOpenRequestReservation = () => {
    setIsMoreInfoModalOpen(false);
    setIsRequestReservationOpen(!isRequestReservationOpen);
  };

  // Colors and icons to iterate
  const icons = [
    <GiWeightLiftingUp />,
    <GiWeightLiftingUp />,
    <RiMentalHealthLine />,
    <RiFootprintFill />,
  ];

  const colors = ["#DCB8CB", "#8499B1", "#93C0A4", "#DECDF5"];

  return (
    <div className="services-menu">
      <div className="title">
        <h1>
          Nuestros servicios disponibles, donde podrás obtener un asesoramiento
          completo.
        </h1>
      </div>

      <div className="services-list_container">
        {services?.map((service, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <ServiceCard
              key={service?.serviceId}
              image={service?.image}
              color={colors[idx]}
              title={service?.title}
              description={service?.description}
              icon={icons[idx]}
              handleSelectService={() => handleSelectService(service)}
              handleOpenServiceModal={handleOpenServiceModal}
              handleOpenRequestReservation={handleOpenRequestReservation}
              isEven={isEven}
            />
          );
        })}
      </div>

      {/* Mostrar modal si hay un servicio seleccionado */}
      {isMoreInfoModalOpen && (
        <MoreInfo
          handleOpenRequestReservation={handleOpenRequestReservation}
          title={selectedService?.title}
          description={selectedService?.description}
          image={selectedService?.image}
          handleOpenServiceModal={handleOpenServiceModal}
          handleLoginModal={handleLoginModal}
        />
      )}

      {/* Modal para seleccionar un turno */}
      {isRequestReservationOpen && (
        <ReservationModal
          handleOpenRequestReservation={handleOpenRequestReservation}
          selectedService={selectedService}
          setIsRequestReservationOpen={setIsRequestReservationOpen}
        />
      )}
    </div>
  );
}

export default Services;
