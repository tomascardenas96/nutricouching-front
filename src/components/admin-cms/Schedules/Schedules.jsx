import { createPortal } from "react-dom";
import { useUser } from "../../../context/UserProvider";
import useGetAvailabilitiesByProfessional from "../../../hooks/useGetAvailabilitiesByProfessional";
import AddScheduleModal from "./AddScheduleModal/AddScheduleModal";
import "./Schedules.css";
import SchedulesCard from "./SchedulesCard/SchedulesCard";
import SchedulesHeader from "./SchedulesHeader/SchedulesHeader";
import useDeleteTimeSlot from "../../../hooks/useDeleteTimeSlot";
import { useState } from "react";

function Schedules() {
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const { user } = useUser();

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
      {Object.entries(availabilities).map(([day, sched]) => (
        <div key={day}>
          {sched.length > 0 && <SchedulesHeader date={getDay(day)} />}

          <div className="bookings-list">
            {orderSchedules(sched).map((schedule) => (
              <SchedulesCard
                key={schedule.availabilityId}
                from={schedule?.startTime}
                to={schedule?.endTime}
                interval={schedule?.interval}
                schedule={schedule}
                handleDeleteTimeSlot={handleDeleteTimeSlot}
                day={day}
              />
            ))}
          </div>
        </div>
      ))}

      <div
        className="add-new-schedule"
        onClick={() => setIsAddScheduleModalOpen(true)}
      >
        <h1>+ Agregar nuevo horario</h1>
      </div>

      {isAddScheduleModalOpen &&
        createPortal(
          <AddScheduleModal
            setIsAddScheduleModalOpen={setIsAddScheduleModalOpen}
          />,
          document.body
        )}
    </section>
  );
}

export default Schedules;
