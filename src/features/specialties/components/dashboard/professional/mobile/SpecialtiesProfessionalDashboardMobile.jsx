import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useAuthUser } from "../../../../../auth/hooks/useAuthUser";
import useGetAllSpecialtiesByProfessional from "../../../../hooks/useGetAllSpecialtiesByProfessional";
import useHandleSpecialtyModals from "../../../../hooks/useHandleSpecialtyModals";
import useHandleUnassignSpecialty from "../../../../hooks/useHandleUnassignSpecialty";
import useSelectSpecialty from "../../../../hooks/useSelectSpecialty";
import SpecialtiesProfessionalCardDashboardMobile from "./SpecialtiesProfessionalCardDashboardMobile";
import "./SpecialtiesProfessionalDashboardMobile.css";
import AssignSpecialtyModal from "../modals/AssignSpecialtyModal";

function SpecialtiesProfessionalDashboardMobile() {
  const { user } = useAuthUser();
  const { specialties, specialtiesError, specialtiesLoading, setSpecialties } =
    useGetAllSpecialtiesByProfessional(user?.professional?.professionalId);

  const { selectedSpecialty, setSelectedSpecialty } = useSelectSpecialty();

  const {
    isAddSpecialtyModalOpen,
    isDeleteSpecialtyModalOpen,
    handleOpenAddSpecialtyModal,
    handleCloseAddSpecialtyModal,
    handleOpenDeleteSpecialtyModal,
    handleCloseDeleteSpecialtyModal,
  } = useHandleSpecialtyModals(setSelectedSpecialty);

  const { handleUnassignSpecialty } = useHandleUnassignSpecialty(
    setSpecialties,
    handleCloseDeleteSpecialtyModal
  );

  return (
    <>
      <div className="specialties-dashboard-mobile_container">
        {specialtiesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : specialtiesLoading ? (
          <DashboardListSkeleton />
        ) : specialties.length > 0 ? (
          <div className="specialties-dashboard-mobile_list">
            {specialties.map((specialty) => (
              <SpecialtiesProfessionalCardDashboardMobile
                key={`specialty-${specialty.specialtyId}`}
                specialty={specialty}
                onDelete={() =>
                  handleOpenDeleteSpecialtyModal(specialty.specialtyId)
                }
              />
            ))}
          </div>
        ) : (
          <p className="no-specialties-defined">
            No hay especialidades asignadas aún
          </p>
        )}

        <div className="add-specialty-mobile_btn">
          <button onClick={handleOpenAddSpecialtyModal}>
            Agregar especialidad
          </button>
        </div>
      </div>

      {isAddSpecialtyModalOpen &&
        createPortal(
          <AssignSpecialtyModal
            professionalSpecialties={specialties}
            onClose={handleCloseAddSpecialtyModal}
            setSpecialties={setSpecialties}
          />,
          document.getElementById("root-portal")
        )}

      {isDeleteSpecialtyModalOpen &&
        createPortal(
          <ConfirmationModal
            message="¿Seguro que desea eliminar esta especialidad?"
            onClose={handleCloseDeleteSpecialtyModal}
            onConfirm={() => handleUnassignSpecialty(selectedSpecialty)}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default SpecialtiesProfessionalDashboardMobile;
