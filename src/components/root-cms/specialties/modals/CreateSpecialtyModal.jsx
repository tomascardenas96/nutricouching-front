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
          <div className="">
            <label htmlFor="name">
              {" "}
              Especialidad
              <input
                type="text"
                name="name"
                onChange={handleChangeCreateSpecialty}
              />
            </label>

            <label htmlFor="serviceId">
              {" "}
              Servicio asociado
              <select
                name="serviceId"
                onChange={handleChangeCreateSpecialty}
                value={newSpecialtyInput.serviceId}
              >
                <option value="">Seleccione un servicio</option>
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

        <div className="specialties-modal_submit">
          <input type="submit" value="Crear" />
        </div>
      </form>
    </div>
  );
}

export default CreateSpecialtyModal;
