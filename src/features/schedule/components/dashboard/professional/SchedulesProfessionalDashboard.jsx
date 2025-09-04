import { createPortal } from "react-dom";
import { getSpanishDay } from "../../../../../lib/date";
import { useAuthUser } from "../../../../auth/hooks/useAuthUser";
import useGetAvailabilitiesByProfessional from "../../../../schedule/hooks/useGetAvailabilitiesByProfessional";
import useAvailabilityModals from "../../../hooks/useAvailabilityModals";
import useSelectAvailability from "../../../hooks/useSelectAvailability";
import { orderSchedules } from "../../../lib/scheduleLibrary";
import "./SchedulesProfessionalDashboard.css";
import AddScheduleModal from "./modals/AddScheduleModal";

function SchedulesProfessionalDashboard() {
  const { user } = useAuthUser();
  const professionalId = user?.professional?.professionalId;

  const { availabilities, setAvailabilities } =
    useGetAvailabilitiesByProfessional(professionalId);
  const { selectedAvailability, setSelectedAvailability } =
    useSelectAvailability();

  const {
    isAddModalOpen,
    isModifyModalOpen,
    isDeleteModalOpen,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenModifyModal,
    handleCloseModifyModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useAvailabilityModals(setSelectedAvailability);

  return (
    <>
      <div className="schedules-container">
        {Object.entries(availabilities).length > 0 ? (
          <table className="schedules-professional-dashboard_table">
            <thead>
              <tr>
                <th></th>
                <th className="from-column">Inicio</th>
                <th className="to-column">Fin</th>
                <th className="interval-column">Intervalo</th>
                <th className="options-column"></th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(availabilities).map(([day, schedule]) =>
                orderSchedules(schedule).map((sched, idx) => (
                  <tr className="dashboard_professional-item">
                    {idx === 0 && (
                      <td rowSpan={schedule.length} className="day-row">
                        <strong>{getSpanishDay(day)}</strong>
                      </td>
                    )}
                    <td className="from-row">{sched.startTime}hs</td>
                    <td className="to-row">{sched.endTime}hs</td>
                    <td>{sched.interval} min.</td>
                    <td className="options-row">
                      <p className="edit">Editar</p>
                      <p className="delete">Eliminar</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p className="no-schedules-defined">No hay horarios definidos aún</p>
        )}

        <div className="add-schedule_btn">
          <button onClick={handleOpenAddModal}>Agregar horarios</button>
        </div>

        {isAddModalOpen &&
          createPortal(
            <AddScheduleModal
              onClose={handleCloseAddModal}
              setAvailabilities={setAvailabilities}
            />,
            document.getElementById("root-portal")
          )}
      </div>
    </>
  );
}

export default SchedulesProfessionalDashboard;
