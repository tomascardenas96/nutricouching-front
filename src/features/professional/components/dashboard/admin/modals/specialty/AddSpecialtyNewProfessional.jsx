import { ImCheckmark, ImCross } from "react-icons/im";
import useGetServices from "../../../../../../services/hooks/useGetServices";
import "./AddSpecialtyNewProfessional.css";

function AddSpecialtyNewProfessional({
  handleCloseAddSpecialtyModal,
  handleChangeCreateSpecialty,
  handleOpenAddSpecialtyModal,
  handleSubmitCreateSpecialty,
  isModalAddSpecialtyOpen,
  setSelectedSpecialties,
}) {
  const {
    handleAddServiceModal,
    handleModifyServiceModal,
    isAddServiceModalOpen,
    isModifyServiceModalOpen,
    services,
    servicesError,
    servicesLoading,
    setServices,
  } = useGetServices();

  return (
    <div
      className="new-specialty-modal_container"
      onClick={handleCloseAddSpecialtyModal}
    >
      <form
        className="new-specialty-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitCreateSpecialty}
      >
        <div className="new-specialty-title">
          <h1>Nueva especialidad</h1>
        </div>

        <div className="add-new-specialty_form-container">
          <div className="new-specialty-name">
            <label htmlFor="">
              Nombre de especialidad
              <input
                type="text"
                placeholder="Dar un nombre a la nueva especialidad"
                name="name"
                onChange={handleChangeCreateSpecialty}
                required
              />
            </label>
          </div>

          <div className="new-specialty-service">
            <label>
              Servicio asociado
              <select
                name="serviceId"
                onChange={handleChangeCreateSpecialty}
                required
              >
                <option value="">Seleccionar un servicio</option>
                {services.map((service) => (
                  <option
                    key={`service-${service.serviceId}`}
                    value={service.serviceId}
                  >
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="new-specialty-btns">
          <ImCross
            className="add-cancel-specialty add-cancel-specialty_close"
            onClick={handleCloseAddSpecialtyModal}
          />
          <button>
            <ImCheckmark className="add-cancel-specialty add-cancel-specialty_done" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSpecialtyNewProfessional;
