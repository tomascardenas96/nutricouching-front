import { ImCheckmark, ImCross } from "react-icons/im";
import useCreateSpecialty from "../../../../hooks/useCreateSpecialty";
import useGetServices from "../../../../hooks/useGetServices";
import "./CreateSpecialtyModal.css";

function CreateSpecialtyModal({ closeModal, setSpecialties }) {
  const { services, servicesError, servicesLoading } = useGetServices();
  const {
    handleChangeCreateSpecialty,
    handleCreateSpecialty,
    newSpecialtyInput,
  } = useCreateSpecialty(setSpecialties, closeModal);

  return (
    <div className="create-specialties_modal">
      <form className="specialties-modal" onSubmit={handleCreateSpecialty}>
        <div className="specialties-modal_header">
          <h1>Crear especialidades</h1>
        </div>

        <div className="specialties-modal_body">
          <div>
            <label htmlFor="name">
              {" "}
              <input
                type="text"
                name="name"
                onChange={handleChangeCreateSpecialty}
                placeholder="Nombre de la especialidad"
              />
            </label>

            <label htmlFor="serviceId">
              {" "}
              <select
                name="serviceId"
                onChange={handleChangeCreateSpecialty}
                value={newSpecialtyInput.serviceId}
              >
                <option value="">Servicio asociado</option>
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

        <div className="add-specialty_buttons">
          <ImCross
            className="add-cancel-specialty add-cancel-specialty_close"
            onClick={closeModal}
          />
          <div>
            <label
              className="specialties-modal_submit"
              htmlFor="create-specialty"
            >
              <input type="submit" id="create-specialty" />
              <ImCheckmark className="add-cancel-specialty add-cancel-specialty_done" />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateSpecialtyModal;
