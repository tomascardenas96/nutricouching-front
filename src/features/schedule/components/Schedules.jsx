import { useState } from "react";
import { createPortal } from "react-dom";
import { RiCalendarScheduleLine } from "react-icons/ri";
import useDeleteTimeSlot from "../../schedule/hooks/useDeleteTimeSlot";
import useGetAvailabilitiesByProfessional from "../../schedule/hooks/useGetAvailabilitiesByProfessional";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import AddScheduleModal from "./AddScheduleModal/AddScheduleModal";
import "./Schedules.css";
import SchedulesCard from "./SchedulesCard/SchedulesCard";
import SchedulesHeader from "./SchedulesHeader/SchedulesHeader";

function Schedules() {
  const { user } = useAuthUser();

  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);

  const {
    availabilities,
    availabilitiesError,
    availabilitiesLoading,
    setAvailabilities,
  } = useGetAvailabilitiesByProfessional(user.professional.professionalId);

  const { handleDeleteTimeSlot } = useDeleteTimeSlot(setAvailabilities);

  // Obtener el dia de la semana en Español.
  const getDay = (day) => {
    const weekDays = {
      Mon: "Lunes",
      Tue: "Martes",
      Wed: "Miercoles",
      Thu: "Jueves",
      Fri: "Viernes",
      Sat: "Sabado",
      Sun: "Domingo",
    };

    return weekDays[`${day}`];
  };

  // Ordenar los horarios por hora de inicio.
  const orderSchedules = (events) => {
    return events.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
  };

  return (
    <section className="professional-schedules_container">
      {
        // Si hay un error al obtener los horarios, mostrar mensaje de error.
        availabilitiesError && (
          <p className="error-message">
            Ocurrió un error al obtener los horarios.
          </p>
        )
      }
      {
        // Si no hay horarios, mostrar mensaje de que no hay horarios.
        !availabilitiesLoading && !Object.entries(availabilities).length && (
          <p className="no-schedules">No hay horarios disponibles.</p>
        )
      }

      {/* Recorrer los horarios y mostrarlos en tarjetas. */}
      {!availabilitiesLoading ? (
        Object.entries(availabilities).map(([day, sched]) => (
          <div key={`day-${day}`}>
            {sched.length > 0 && <SchedulesHeader date={getDay(day)} />}

            <div className="schedules-list">
              {orderSchedules(sched).map((schedule) => (
                <SchedulesCard
                  key={`schedule-${schedule?.availabilityId}`}
                  from={schedule?.startTime}
                  to={schedule?.endTime}
                  interval={schedule?.interval}
                  handleDeleteTimeSlot={handleDeleteTimeSlot}
                  day={day}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1>Cargando...</h1>
      )}

      <div
        className="add-new-schedule"
        onClick={() => setIsAddScheduleModalOpen(true)}
      >
        <h1>
          <RiCalendarScheduleLine className="schedule-icon" /> AGREGAR NUEVO
          HORARIO
        </h1>
      </div>

      {isAddScheduleModalOpen &&
        createPortal(
          <AddScheduleModal
            setIsAddScheduleModalOpen={setIsAddScheduleModalOpen}
            setAvailabilities={setAvailabilities}
          />,
          document.body
        )}
    </section>
  );
}

export default Schedules;
