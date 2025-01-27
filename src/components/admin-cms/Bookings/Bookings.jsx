import { useUser } from "../../../context/UserProvider";
import useGetBookingsByProfessional from "../../../hooks/useGetBookingsByProfessional";
import "./Bookings.css";
import BookingsCard from "./BookingsCard/BookingsCard";
import BookingsHeader from "./BookingsHeader/BookingsHeader";

function Bookings() {
  const { user } = useUser();

  const { bookings, errorBookings, loadingBookings } =
    useGetBookingsByProfessional(user.professional.professionalId);

  // Función para recortar la hora de los turnos de 8:00:00 a 8:00 (solo la hora y minutos).
  const shortTime = (time) => {
    return time.substring(0, 5);
  };

  // Función para verificar si la fecha es anterior a la actual.
  const isPreviousDate = (date) => {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    today.setMinutes(0, 0, 0, 0);
    today.setMilliseconds(0, 0, 0, 0);

    const dateObj = new Date(date + "T00:00:00");

    return dateObj < today;
  };

  return (
    <section className="professional-bookings_container">
      {/* Pasamos el objeto bookings a un array para verificar si tiene un length (si existe al menos un turno reservado) */}
      {Object.entries(bookings).length ? (
        Object.entries(bookings).map(([date, events], idx) => (
          <div key={date + idx}>
            {!isPreviousDate(date) && (
              <>
                <BookingsHeader date={date} />
                <div className="bookings-list">
                  {events.map((event) => (
                    <BookingsCard
                      key={date + event.startTime}
                      name={event.user.name + " " + event.user.lastname}
                      specialty={event.specialtyId}
                      startTimetable={shortTime(event.startTime)}
                      endTimetable={shortTime(event.endTime)}
                      event={event}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="no-bookings-paragraph">No hay turnos realizados.</p>
      )}
    </section>
  );
}

export default Bookings;
