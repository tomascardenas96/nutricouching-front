import ModalWindow from "../../../../../../common/components/dashboard/ModalWindow";
import useGetServices from "../../../../../services/hooks/useGetServices";
import useModifySpecialty from "../../../../hooks/useModifySpecialty";
import "./ModifySpecialtyRootModal.css";

function ModifySpecialtyRootModal({
  selectedSpecialty,
  setSpecialties,
  handleCloseModifyModal,
}) {
  const {
    handleChangeModifySpecialty,
    handleSubmitModifySpecialty,
    modifySpecialtyInput,
  } = useModifySpecialty(
    selectedSpecialty,
    setSpecialties,
    handleCloseModifyModal
  );

  const { services } = useGetServices();

  const filterServiceFromSelectedSpecialty = services?.find(
    (service) => service.serviceId === selectedSpecialty.service.serviceId
  );

  return (
    <ModalWindow
      onClose={handleCloseModifyModal}
      onSubmit={handleSubmitModifySpecialty}
      title="Modificar Especialidad"
    >
      <label htmlFor="name">
        Nombre de especialidad
        <input
          type="text"
          name="name"
          onChange={handleChangeModifySpecialty}
          value={modifySpecialtyInput.name}
        />
      </label>
      <label htmlFor="serviceId">
        Servicio
        <select
          name="serviceId"
          onChange={handleChangeModifySpecialty}
          value={modifySpecialtyInput.serviceId}
        >
          <option value={filterServiceFromSelectedSpecialty?.serviceId}>
            {filterServiceFromSelectedSpecialty?.title}
          </option>
          {services?.map(
            (service) =>
              selectedSpecialty?.service.serviceId !== service.serviceId && (
                <option
                  key={`service-${service.serviceId}`}
                  value={service.serviceId}
                >
                  {service.title}
                </option>
              )
          )}
        </select>
      </label>

      <button
        disabled={
          selectedSpecialty.name === modifySpecialtyInput.name &&
          selectedSpecialty.service.serviceId === modifySpecialtyInput.serviceId
        }
      >
        Enviar
      </button>
    </ModalWindow>
  );
}

export default ModifySpecialtyRootModal;
