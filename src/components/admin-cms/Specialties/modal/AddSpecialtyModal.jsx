import useAssignSpecialtyToProfessional from "../../../../hooks/useAssignSpecialtyToProfessional";
import useGetAllSpecialties from "../../../../hooks/useGetAllSpecialties";
import "./AddSpecialtyModal.css";

function AddSpecialtyModal({ handleOpenCloseModal, user, setSpecialties }) {
  const { errorSpecialties, loadingSpecialties, specialties } =
    useGetAllSpecialties();

  const {
    assignSpecialtyToProfessional,
    handleChangeSelectSpecialty,
    selectedSpecialtyId,
  } = useAssignSpecialtyToProfessional(setSpecialties, handleOpenCloseModal);

  return (
    <div className="add-specialty-modal_container">
      <form
        className="add-specialty-modal"
        onSubmit={(e) =>
          assignSpecialtyToProfessional(
            e,
            selectedSpecialtyId,
            user.professional.professionalId
          )
        }
      >
        {/* Eliminar este parrafo luego */}
        <p onClick={handleOpenCloseModal}>Cerrar modal</p>

        <div>
          <select onChange={handleChangeSelectSpecialty}>
            <option value="">Seleccione una especialidad</option>
            {specialties.map((specialty) => (
              <option
                key={`specialty-${specialty.specialtyId}`}
                value={specialty.specialtyId}
              >
                {specialty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input type="submit" value="Agregar" />
        </div>
      </form>
    </div>
  );
}

export default AddSpecialtyModal;
