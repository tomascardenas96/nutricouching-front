import "./UserBookingsModal.css";
import { IoMdClose } from "react-icons/io";
import { GrSchedule } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import BookingsCard from "../admin-cms/Bookings/BookingsCard/BookingsCard";
import BookingsHeader from "../admin-cms/Bookings/BookingsHeader/BookingsHeader";
import React, { useState } from "react";
import PreviousShiftUserCard from "./PreviousShiftUserCard";
import useGetBookingsByUser from "../../hooks/useGetBookingsByUser";
import ConfirmationModal from "../Common/ConfirmationModal";
import { createPortal } from "react-dom";
import useCancelBooking from "../../hooks/useCancelBooking";

function UserBookingsModal({ closeModal }) {
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
    <div className="user-notifications-modal_container" onClick={closeModal}>
      <section
        className="user-notifications-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pending-shifts-header">
          <h1>
            Turnos Pendientes <GrSchedule className="schedule-icon" />
          </h1>
          <IoMdClose className="close-icon" onClick={closeModal} />
        </div>
        <div className="pending-shifts_container">
          {Object.entries(nextBookings).length ? (
            <>
              {Object.entries(nextBookings).map(([date, bookings]) => (
                <>
                  <BookingsHeader date={date} />
                  {bookings.map((booking) => (
                    <BookingsCard
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
                </>
              ))}
            </>
          ) : (
            <p className="no-pending-bookings">No hay turnos pendientes.</p>
          )}
        </div>

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
                  <>
                    <PreviousShiftUserCard
                      name={booking.professional.fullname}
                      date={date}
                      specialty={booking.specialtyId}
                      startTimetable={booking.startTime}
                      endTimetable={booking.endTime}
                      booking={booking}
                    />
                  </>
                ))
              )}
            </>
          ) : (
            <p className="no-previous-shifts">No hay turnos anteriores.</p>
          )}
        </div>
      </section>

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
    </div>
  );
}

export default UserBookingsModal;
