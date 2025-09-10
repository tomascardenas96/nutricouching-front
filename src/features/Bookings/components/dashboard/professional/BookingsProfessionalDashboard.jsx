import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { isPreviousDate, parseDate, shortDate } from "../../../../../lib/date";
import { sortBookings } from "../../../../bookings/lib/bookingFunctions";
import useGetAllSpecialties from "../../../../specialties/hooks/useGetAllSpecialties";
import { getSpecialtyById } from "../../../../specialties/lib/specialtyFunctions";
import useBookingModals from "../../../hooks/useBookingModals";
import useCancelBooking from "../../../hooks/useCancelBooking";
import useGetBookingsByProfessional from "../../../hooks/useGetBookingsByProfessional";
import "./BookingsProfessionalDashboard.css";

function BookingsProfessionalDashboard() {
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
      <div className="bookings-container">
        {errorBookings ? (
          <p className="error">Ha ocurrido un error</p>
        ) : loadingBookings || !specialties ? (
          <DashboardListSkeleton />
        ) : Object.values(bookings).flat().length > 0 ? (
          <table className="bookings-professional-dashboard_table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th className="date-column">Fecha</th>
                <th className="specialty-column">Especialidad</th>
                <th className="from-column">Desde</th>
                <th className="to-column">Hasta</th>
                <th className="options-column"></th>
              </tr>
            </thead>

            <tbody>
              {listedBookings.map(([date, events], idx) =>
                sortBookings(events).map(
                  (e) =>
                    !isPreviousDate(date) && (
                      <tr
                        className="dashboard_professional-item"
                        key={date + e.bookingId + idx}
                      >
                        <td>
                          {e.user.name} {e.user.lastname}
                        </td>
                        <td className="date-row">{parseDate(date)}</td>
                        <td className="specialty-row">
                          {getSpecialtyById(specialties, e.specialtyId)}
                        </td>
                        <td className="from-row">{shortDate(e.startTime)}hs</td>
                        <td className="to-row">{shortDate(e.endTime)}hs</td>
                        <td className="options-row">
                          <p
                            className="delete"
                            onClick={() =>
                              handleOpenDeleteBookingModal(e.bookingId)
                            }
                          >
                            Cancelar
                          </p>
                        </td>
                        <div className="divider-line_container">
                          <hr className="divider-line" />
                        </div>
                      </tr>
                    )
                )
              )}
            </tbody>
          </table>
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

export default BookingsProfessionalDashboard;
