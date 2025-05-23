import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import useAssignSpecialtyToProfessional from "../../../professional/hooks/useAssignSpecialtyToProfessional";
import useGetAllSpecialties from "../../../specialties/hooks/useGetAllSpecialties";
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
        <div className="add-specialty_title">
          <h1>Agregar Especialidad</h1>
          <IoMdClose
            onClick={handleOpenCloseModal}
            className="close-modal_icon"
          />
        </div>

        <div className="add-specialty_body">
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

        <div className="submit-add-specialty_options">
          <ImCross className="add-cancel-specialty add-cancel-specialty_close" />
          <div>
            <label htmlFor="add-specialty_submit">
              <input type="submit" id="add-specialty_submit" />
              <ImCheckmark className="add-cancel-specialty add-cancel-specialty_done" />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddSpecialtyModal;
