import { createPortal } from "react-dom";
import SchedulesSkeleton from "../../../../../common/components/dashboard/loader/SchedulesSkeleton";
import useGetAllSpecialties from "../../../../specialties/hooks/useGetAllSpecialties";
import useGetAllSpecialtiesByProfessional from "../../../hooks/useGetAllSpecialtiesByProfessional";
import useHandleSpecialtyModals from "../../../hooks/useHandleSpecialtyModals";
import "./SpecialtiesProfessionalDashboard.css";
import AssignSpecialtyModal from "./modals/AssignSpecialtyModal";

function SpecialtiesProfessionalDashboard() {
  const { specialties, specialtiesError, specialtiesLoading, setSpecialties } =
    useGetAllSpecialtiesByProfessional();

  const {
    isAddSpecialtyModalOpen,
    handleOpenAddSpecialtyModal,
    handleCloseAddSpecialtyModal,
  } = useHandleSpecialtyModals();

  return (
    <>
      <div className="specialties-container">
        {specialtiesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : specialtiesLoading ? (
          <SchedulesSkeleton />
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
                    <p className="delete">Eliminar</p>
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
            Agregar horarios
          </button>
        </div>
      </div>

      {isAddSpecialtyModalOpen &&
        createPortal(
          <AssignSpecialtyModal
            onClose={handleCloseAddSpecialtyModal}
            setSpecialties={setSpecialties}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default SpecialtiesProfessionalDashboard;
