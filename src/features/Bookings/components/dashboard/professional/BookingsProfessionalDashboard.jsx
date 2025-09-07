import { isPreviousDate, parseDate, shortDate } from "../../../../../lib/date";
import useGetBookingsByProfessional from "../../../hooks/useGetBookingsByProfessional";
import { sortBookings } from "../../../../bookings/lib/bookingFunctions";
import useGetAllSpecialties from "../../../../specialties/hooks/useGetAllSpecialties";
import { getSpecialtyById } from "../../../../specialties/lib/specialtyFunctions";
import "./BookingsProfessionalDashboard.css";
import SchedulesSkeleton from "../../../../../common/components/dashboard/loader/SchedulesSkeleton";

function BookingsProfessionalDashboard() {
  const { bookings, loadingBookings, errorBookings } =
    useGetBookingsByProfessional();
  const { specialties } = useGetAllSpecialties();
  const listedBookings = Object.entries(bookings);

  return (
    <>
      <div className="bookings-container">
        {errorBookings ? (
          <p className="error">Ha ocurrido un error</p>
        ) : loadingBookings || !specialties ? (
          <SchedulesSkeleton />
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
                          <p className="delete">Cancelar</p>
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
    </>
  );
}

export default BookingsProfessionalDashboard;
