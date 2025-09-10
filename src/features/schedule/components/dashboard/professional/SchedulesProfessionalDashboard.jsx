import { createPortal } from "react-dom";
import { getSpanishDay } from "../../../../../lib/date";
import { useAuthUser } from "../../../../auth/hooks/useAuthUser";
import useGetAvailabilitiesByProfessional from "../../../../schedule/hooks/useGetAvailabilitiesByProfessional";
import useAvailabilityModals from "../../../hooks/useAvailabilityModals";
import useSelectAvailability from "../../../hooks/useSelectAvailability";
import { orderSchedules } from "../../../lib/scheduleLibrary";
import "./SchedulesProfessionalDashboard.css";
import AddScheduleModal from "./modals/AddScheduleModal";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteTimeSlot from "../../../hooks/useDeleteTimeSlot";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function SchedulesProfessionalDashboard() {
  const { user } = useAuthUser();
  const professionalId = user?.professional?.professionalId;

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

  const {
    availabilities,
    availabilitiesLoading,
    availabilitiesError,
    setAvailabilities,
  } = useGetAvailabilitiesByProfessional(professionalId);

  const { handleDeleteTimeSlot } = useDeleteTimeSlot(
    setAvailabilities,
    handleCloseDeleteModal
  );

  return (
    <>
      <div className="schedules-container">
        {availabilitiesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : availabilitiesLoading ? (
          <DashboardListSkeleton />
        ) : Object.values(availabilities).flat().length > 0 ? (
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
                        {getSpanishDay(day)}
                      </td>
                    )}
                    <td className="from-row">{sched.startTime}hs</td>
                    <td className="to-row">{sched.endTime}hs</td>
                    <td>{sched.interval} min.</td>
                    <td className="options-row">
                      <p
                        className="delete"
                        onClick={() =>
                          handleOpenDeleteModal({
                            day,
                            startTime: sched.startTime,
                          })
                        }
                      >
                        Eliminar
                      </p>
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

        {isDeleteModalOpen &&
          createPortal(
            <ConfirmationModal
              message="¿Seguro que desea eliminar horario?"
              onClose={handleCloseDeleteModal}
              onConfirm={() =>
                handleDeleteTimeSlot(
                  selectedAvailability.startTime,
                  selectedAvailability.day
                )
              }
            />,
            document.getElementById("root-portal")
          )}
      </div>
    </>
  );
}

export default SchedulesProfessionalDashboard;
