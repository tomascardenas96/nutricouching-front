import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { isPreviousDate, parseDate } from "../../../../../../lib/date";
import { sortBookings } from "../../../../../bookings/lib/bookingFunctions";
import useGetAllSpecialties from "../../../../../specialties/hooks/useGetAllSpecialties";
import { getSpecialtyById } from "../../../../../specialties/lib/specialtyFunctions";
import useBookingModals from "../../../../hooks/useBookingModals";
import useCancelBooking from "../../../../hooks/useCancelBooking";
import useGetBookingsByProfessional from "../../../../hooks/useGetBookingsByProfessional";
import BookingsCardDashboardMobile from "./BookingsCardDashboardMobile";
import "./BookingsProfessionalDashboardMobile.css";

function BookingsProfessionalDashboardMobile() {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const { bookings, loadingBookings, errorBookings, setBookings } =
    useGetBookingsByProfessional();
  const { specialties } = useGetAllSpecialties();
  const listedBookings = Object.entries(bookings);

  const {
    isDeleteBookingModalOpen,
    handleOpenDeleteBookingModal,
    handleCloseDeleteBookingModal,
  } = useBookingModals(setSelectedBookingId);

  const { handleCancelBooking } = useCancelBooking(
    setBookings,
    handleCloseDeleteBookingModal
  );

  return (
    <>
      <div className="bookings-dashboard-mobile_container">
        {errorBookings ? (
          <p className="error">Ha ocurrido un error</p>
        ) : loadingBookings || !specialties ? (
          <DashboardListSkeleton />
        ) : Object.values(bookings).flat().length > 0 ? (
          <div className="bookings-dashboard-mobile_list">
            {listedBookings.map(([date, events], idx) =>
              sortBookings(events).map(
                (e) =>
                  !isPreviousDate(date) && (
                    <BookingsCardDashboardMobile
                      key={date + e.bookingId + idx}
                      booking={e}
                      date={parseDate(date)}
                      specialty={getSpecialtyById(specialties, e.specialtyId)}
                      onCancel={() => handleOpenDeleteBookingModal(e.bookingId)}
                    />
                  )
              )
            )}
          </div>
        ) : (
          <p className="no-schedules-defined">No hay turnos reservados aún</p>
        )}
      </div>

      {isDeleteBookingModalOpen &&
        createPortal(
          <ConfirmationModal
            message="¿Estás seguro que querés cancelar el turno?"
            onClose={handleCloseDeleteBookingModal}
            onConfirm={() => handleCancelBooking(selectedBookingId)}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default BookingsProfessionalDashboardMobile;
