import BaseModal from "../../../../../../common/components/BaseModal";
import useActiveProfessional from "../../../../../professional/hooks/useActiveProfessional";
import useAssignSpecialtyToProfessional from "../../../../hooks/useAssignSpecialtyToProfessional";
import useGetAllSpecialties from "../../../../hooks/useGetAllSpecialties";
import "./AssignSpecialtyModal.css";

function AssignSpecialtyModal({
  professionalSpecialties,
  onClose,
  setSpecialties,
}) {
  const { professionalId } = useActiveProfessional();
  const { specialties } = useGetAllSpecialties();

  const isSpecialtyExistent = (specialtyId) => {
    return professionalSpecialties?.some(
      (sp) => sp.specialtyId === specialtyId
    );
  };

  const {
    assignSpecialtyToProfessional,
    handleChangeSelectSpecialty,
    selectedSpecialtyId,
  } = useAssignSpecialtyToProfessional(setSpecialties, onClose);

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      onSubmit={(e) =>
        assignSpecialtyToProfessional(e, selectedSpecialtyId, professionalId)
      }
      title="Agregar Especialidad"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Asignar
          </button>
        </div>
      }
    >
      <div className="add-specialty_body">
        <select onChange={handleChangeSelectSpecialty}>
          <option value="">Seleccione una especialidad</option>
          {specialties.map((specialty) => {
            if (isSpecialtyExistent(specialty.specialtyId)) return null;
            return (
              <option
                key={`specialty-${specialty.specialtyId}`}
                value={specialty.specialtyId}
              >
                {specialty.name}
              </option>
            );
          })}
        </select>
      </div>
    </BaseModal>
  );
}

export default AssignSpecialtyModal;
