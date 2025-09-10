import { createPortal } from "react-dom";
import { getSpanishDay } from "../../../../../../lib/date";
import { useAuthUser } from "../../../../../auth/hooks/useAuthUser";
import useGetAvailabilitiesByProfessional from "../../../../hooks/useGetAvailabilitiesByProfessional";
import useAvailabilityModals from "../../../../hooks/useAvailabilityModals";
import useSelectAvailability from "../../../../hooks/useSelectAvailability";
import { orderSchedules } from "../../../../lib/scheduleLibrary";
import AddScheduleModal from "../modals/AddScheduleModal";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteTimeSlot from "../../../../hooks/useDeleteTimeSlot";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import SchedulesCardDashboardMobile from "./SchedulesCardDashboardMobile";
import "./SchedulesProfessionalDashboardMobile.css";

function SchedulesProfessionalDashboardMobile() {
  const { user } = useAuthUser();
  const professionalId = user?.professional?.professionalId;

  const { selectedAvailability, setSelectedAvailability } =
    useSelectAvailability();

  const {
    isAddModalOpen,
    isDeleteModalOpen,
    handleOpenAddModal,
    handleCloseAddModal,
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
      <div className="schedules-dashboard-mobile_container">
        {availabilitiesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : availabilitiesLoading ? (
          <DashboardListSkeleton />
        ) : Object.values(availabilities).flat().length > 0 ? (
          <div className="schedules-dashboard-mobile_list">
            {Object.entries(availabilities).map(([day, schedule]) =>
              orderSchedules(schedule).map((sched, idx) => (
                <SchedulesCardDashboardMobile
                  key={`${day}-${sched.startTime}-${idx}`}
                  day={idx === 0 ? getSpanishDay(day) : null}
                  startTime={sched.startTime}
                  endTime={sched.endTime}
                  interval={sched.interval}
                  onDelete={() =>
                    handleOpenDeleteModal({ day, startTime: sched.startTime })
                  }
                />
              ))
            )}
          </div>
        ) : (
          <p className="no-schedules-defined">No hay horarios definidos aún</p>
        )}

        <div className="add-schedule_btn">
          <button onClick={handleOpenAddModal}>Agregar horarios</button>
        </div>
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
    </>
  );
}

export default SchedulesProfessionalDashboardMobile;
