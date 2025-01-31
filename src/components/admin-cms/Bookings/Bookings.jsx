import { useState } from "react";
import { useUser } from "../../../context/UserProvider";
import useCancelBooking from "../../../hooks/useCancelBooking";
import useGetBookingsByProfessional from "../../../hooks/useGetBookingsByProfessional";
import "./Bookings.css";
import BookingsCard from "./BookingsCard/BookingsCard";
import BookingsHeader from "./BookingsHeader/BookingsHeader";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../Common/ConfirmationModal";

function Bookings() {
  const [isConfirmationDeleteBookingOpen, setIsConfirmationDeleteBookingOpen] =
    useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleOpenConfirmationDeleteBooking = () => {
    setIsConfirmationDeleteBookingOpen(!isConfirmationDeleteBookingOpen);
  };

  const { user } = useUser();

  const { bookings, setBookings, errorBookings, loadingBookings } =
    useGetBookingsByProfessional(user.professional.professionalId);

  const { handleCancelBooking } = useCancelBooking(setBookings);

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

  // Ordenar los horarios por hora de inicio.
  const orderBookings = (events) => {
    return events.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
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
                  {orderBookings(events).map((event) => (
                    <BookingsCard
                      key={date + event.startTime}
                      name={event.user.name + " " + event.user.lastname}
                      specialty={event.specialtyId}
                      startTimetable={shortTime(event.startTime)}
                      endTimetable={shortTime(event.endTime)}
                      id={event.bookingId}
                      handleCancelBooking={handleCancelBooking}
                      isConfirmationDeleteBookingOpen={
                        isConfirmationDeleteBookingOpen
                      }
                      handleOpenConfirmationDeleteBooking={
                        handleOpenConfirmationDeleteBooking
                      }
                      setSelectedBookingId={setSelectedBookingId}
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
      {isConfirmationDeleteBookingOpen &&
        createPortal(
          <ConfirmationModal
            message="Seguro que desea cancelar este turno?"
            onClose={handleOpenConfirmationDeleteBooking}
            onConfirm={() => handleCancelBooking(selectedBookingId)}
          />,
          document.body
        )}
    </section>
  );
}

export default Bookings;
