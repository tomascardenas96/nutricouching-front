import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import useGetAllSpecialtiesByProfessional from "../../../hooks/useGetAllSpecialtiesByProfessional";
import useHandleSpecialtyModals from "../../../hooks/useHandleSpecialtyModals";
import useHandleUnassignSpecialty from "../../../hooks/useHandleUnassignSpecialty";
import useSelectSpecialty from "../../../hooks/useSelectSpecialty";
import "./SpecialtiesProfessionalDashboard.css";
import AssignSpecialtyModal from "./modals/AssignSpecialtyModal";
import { useAuthUser } from "../../../../auth/hooks/useAuthUser";

function SpecialtiesProfessionalDashboard() {
  const { user } = useAuthUser();
  const { specialties, specialtiesError, specialtiesLoading, setSpecialties } =
    useGetAllSpecialtiesByProfessional(user.professional.professionalId);
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
      <div className="specialties-container">
        {specialtiesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : specialtiesLoading ? (
          <DashboardListSkeleton />
        ) : specialties.length > 0 ? (
          <table className="users-root-dashboard_table">
            <thead>
              <tr>
                <th>Especialidad</th>
                <th className="lastname-column">Categoria</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>

            <tbody>
              {specialties.map((specialty) => (
                <tr
                  className="dashboard_users-item"
                  key={`specialty-${specialty.specialtyId}`}
                >
                  <td>{specialty.name}</td>
                  <td className="lastname-row">{specialty.category.name}</td>
                  <td className="options-row">
                    <p
                      className="delete"
                      onClick={() =>
                        handleOpenDeleteSpecialtyModal(specialty.specialtyId)
                      }
                    >
                      Eliminar
                    </p>
                  </td>
                  <div className="divider-line_container">
                    <hr className="divider-line" />
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-schedules-defined">
            No hay especialidades asignadas aún
          </p>
        )}

        <div className="add-specialty_btn">
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

export default SpecialtiesProfessionalDashboard;
