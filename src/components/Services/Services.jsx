import "./Services.css";
import ServiceCard from "./ServicesCard";
import { GiWeightLiftingUp } from "react-icons/gi";
import { RiMentalHealthLine, RiFootprintFill } from "react-icons/ri";
import useGetServices from "../../hooks/useGetServices";
import MoreInfo from "./MoreInfo";
import { useState } from "react";

function Services() {
  const { services, servicesLoading, servicesError } = useGetServices();

  const [selectedService, setSelectedService] = useState(null);

  const icons = [
    <GiWeightLiftingUp />,
    <GiWeightLiftingUp />,
    <RiMentalHealthLine />,
    <RiFootprintFill />,
  ];

  const handleOpenServiceModal = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null); // cierra el modal
  };

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
        <div className="services-list">
          {services?.map((service, idx) => (
            <ServiceCard
              key={service.serviceId}
              image={service.image}
              color={colors[idx]}
              title={service.title}
              description={service.description}
              icon={icons[idx]}
              handleOpenServiceModal={() => handleOpenServiceModal(service)}
            />
          ))}
        </div>
      </div>

      {/* Mostrar modal si hay un servicio seleccionado */}
      {selectedService && (
        <MoreInfo
          handleServicesModal={handleCloseModal}
          title={selectedService.title}
          description={selectedService.description}
          image={selectedService.image}
        />
      )}
    </div>
  );
}

export default Services;
