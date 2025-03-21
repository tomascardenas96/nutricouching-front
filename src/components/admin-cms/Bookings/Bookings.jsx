import { useState } from "react";
import { createPortal } from "react-dom";
import useCancelBooking from "../../../hooks/useCancelBooking";
import useGetBookingsByProfessional from "../../../hooks/useGetBookingsByProfessional";
import ConfirmationModal from "../../Common/ConfirmationModal";
import "./Bookings.css";
import BookingsCard from "./BookingsCard/BookingsCard";
import BookingsHeader from "./BookingsHeader/BookingsHeader";
function Bookings({ user }) {
  const [isConfirmationDeleteBookingOpen, setIsConfirmationDeleteBookingOpen] =
    useState(false);

  // ID del turno seleccionado para ser eliminado.
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Abrir/cerrar modal de confirmacion.
  const handleOpenConfirmationDeleteBooking = () => {
    setIsConfirmationDeleteBookingOpen(!isConfirmationDeleteBookingOpen);
  };

  // Reservaciones del profesional logueado.
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

  // Verificar si hay algún booking para el futuro (hoy o posterior)
  const hasFutureBookings = () => {
    return Object.keys(bookings).some((date) => !isPreviousDate(date));
  };

  return (
    <section className="professional-bookings_container">
      {Object.entries(bookings).length === 0 ? (
        <p className="no-bookings-paragraph">No hay turnos pendientes.</p>
      ) : hasFutureBookings() ? (
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
        <p className="no-bookings-paragraph">No hay turnos pendientes.</p>
      )}

      {isConfirmationDeleteBookingOpen &&
        createPortal(
          <ConfirmationModal
            message="Seguro que desea cancelar este turno?"
            onClose={handleOpenConfirmationDeleteBooking}
            onConfirm={() =>
              handleCancelBooking(selectedBookingId).then(
                handleOpenConfirmationDeleteBooking()
              )
            }
          />,
          document.body
        )}
    </section>
  );
}

export default Bookings;
