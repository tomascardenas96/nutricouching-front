import { useUser } from "../../../context/UserProvider";
import useGetAvailabilitiesByProfessional from "../../../hooks/useGetAvailabilitiesByProfessional";
import "./Schedules.css";
import SchedulesCard from "./SchedulesCard/SchedulesCard";
import SchedulesHeader from "./SchedulesHeader/SchedulesHeader";

function Schedules() {
  const { user } = useUser();

  const { availabilities, availabilitiesError, availabilitiesLoading } =
    useGetAvailabilitiesByProfessional(user.professional.professionalId);

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

  return (
    <section className="professional-schedules_container">
      {Object.entries(availabilities).map(([day, sched]) => (
        <>
          <SchedulesHeader date={getDay(day)} />
          <div className="bookings-list">
            {sched.map((schedule) => (
              <SchedulesCard
                from={schedule?.startTime}
                to={schedule?.endTime}
                interval={schedule?.interval}
              />
            ))}
          </div>
        </>
      ))}

      <div className="add-new-schedule">
        <h1>+ Agregar nuevo horario</h1>
      </div>
    </section>
  );
}

export default Schedules;
