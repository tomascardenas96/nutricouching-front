import { useState } from "react";
import { createPortal } from "react-dom";
import { GrSchedule } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import useCancelBooking from "../../../hooks/useCancelBooking";
import useGetBookingsByUser from "../../../hooks/useGetBookingsByUser";
import ConfirmationModal from "../../Common/ConfirmationModal";
import BookingsCard from "../../admin-cms/Bookings/BookingsCard/BookingsCard";
import BookingsHeader from "../../admin-cms/Bookings/BookingsHeader/BookingsHeader";
import "./BookingsSection.css";
import PreviousShiftUserCard from "./PreviousShiftUserCard";

function BookingsSection({ closeModal }) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isConfirmationDeleteBookingOpen, setIsConfirmationDeleteBookingOpen] =
    useState(false);

  const {
    setBookingsOfUser,
    bookingsOfUserLoading,
    bookingsOfUserError,
    previousBookings,
    nextBookings,
  } = useGetBookingsByUser();

  const { handleCancelBooking } = useCancelBooking(setBookingsOfUser);

  const handleOpenConfirmationDeleteBooking = () => {
    setIsConfirmationDeleteBookingOpen(!isConfirmationDeleteBookingOpen);
  };

  return (
    <section>
      <div className="pending-shifts-header">
        <h1>
          Turnos Pendientes <GrSchedule className="schedule-icon" />
        </h1>
      </div>

      {/* Mostramos la lista de turnos pendientes */}
      <div className="pending-shifts_container">
        {Object.entries(nextBookings).length ? (
          <>
            {Object.entries(nextBookings).map(([date, bookings], idx) => (
              <div key={`bookings_${date}_${idx}`}>
                <BookingsHeader date={date} />
                {bookings.map((booking) => (
                  <BookingsCard
                    key={`booking_${booking.bookingId}`}
                    name={booking.professional.fullname}
                    specialty={booking.specialtyId}
                    startTimetable={booking.startTime}
                    endTimetable={booking.endTime}
                    setSelectedBookingId={setSelectedBookingId}
                    isConfirmationDeleteBookingOpen={
                      isConfirmationDeleteBookingOpen
                    }
                    handleOpenConfirmationDeleteBooking={
                      handleOpenConfirmationDeleteBooking
                    }
                    handleCancelBooking={handleCancelBooking}
                    id={booking.bookingId}
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          <p className="no-pending-bookings">No hay turnos pendientes.</p>
        )}
      </div>

      {/* Mostramos el historial de turnos */}
      <div className="previous-shifts-header">
        <h1>
          Historial de Turnos <MdHistory className="history-icon" />
        </h1>
      </div>
      <div className="previous-shifts_container">
        {Object.entries(previousBookings).length ? (
          <>
            {Object.entries(previousBookings).map(([date, bookings]) =>
              bookings.map((booking) => (
                <div
                  className="previous-shift_list"
                  key={`booking_${booking.bookingId}`}
                >
                  <PreviousShiftUserCard
                    name={booking.professional.fullname}
                    date={date}
                    specialty={booking.specialtyId}
                    startTimetable={booking.startTime}
                    endTimetable={booking.endTime}
                    booking={booking}
                  />
                </div>
              ))
            )}
          </>
        ) : (
          <p className="no-previous-shifts">No hay turnos anteriores.</p>
        )}
      </div>

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

export default BookingsSection;
