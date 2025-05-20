import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaAddressCard } from "react-icons/lia";
import ConfirmationModal from "../../../../common/components/ConfirmationModal";
import useDeleteService from "../../hooks/useDeleteService";
import useGetServices from "../../hooks/useGetServices";
import ServicesCmsCard from "./ServicesCmsCard";
import "./ServicesList.css";
import AddServiceModal from "./modals/AddServiceModal";
import ModifyServiceModal from "./modals/ModifyServiceModal";

function ServicesList() {
  const [selectedService, setSelectedService] = useState(null);

  const {
    services,
    servicesLoading,
    servicesError,
    handleAddServiceModal,
    handleModifyServiceModal,
    isAddServiceModalOpen,
    isModifyServiceModalOpen,
    setServices,
  } = useGetServices();

  const {
    handleDeleteService,
    isDeleteServiceModalOpen,
    openModal,
    closeModal,
  } = useDeleteService(setServices);

  return (
    <section className="cms-services">
      <div className="cms-services_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="search-filter_icon" />
        </form>
      </div>

      <div className="cms-services_body">
        <table>
          <thead>
            <tr className="header_table">
              <th className="header_table-name">Nombre</th>
              <th className="header_table-price">Precio</th>
              <th className="header_table-options">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service) => (
              <tr key={`service-${service.serviceId}`}>
                <ServicesCmsCard
                  service={service}
                  handleModifyServiceModal={handleModifyServiceModal}
                  setSelectedService={setSelectedService}
                  openModal={openModal}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div onClick={handleAddServiceModal} className="cms-service-add">
        <LiaAddressCard className="add-service_icon" />
        <h1>CREAR NUEVO SERVICIO</h1>
      </div>

      {isAddServiceModalOpen && (
        <AddServiceModal
          handleAddServiceModal={handleAddServiceModal}
          setServices={setServices}
        />
      )}

      {isModifyServiceModalOpen && (
        <ModifyServiceModal
          handleModifyServiceModal={handleModifyServiceModal}
          selectedService={selectedService}
          setServices={setServices}
        />
      )}

      {isDeleteServiceModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteServiceModalOpen}
          onClose={closeModal}
          onConfirm={handleDeleteService}
        />
      )}
    </section>
  );
}

export default ServicesList;
