import { getSpanishDay } from "../../../../../lib/date";
import useGetAvailabilitiesByProfessional from "../../../../schedule/hooks/useGetAvailabilitiesByProfessional";
import { orderSchedules } from "../../../lib/scheduleLibrary";
import "./SchedulesProfessionalDashboard.css";

function SchedulesProfessionalDashboard() {
  const { availabilities } = useGetAvailabilitiesByProfessional();

  return (
    <table className="schedules-professional-dashboard_table">
      <thead>
        <tr>
          <th></th>
          <th className="from-column">Inicio</th>
          <th className="to-column">Fin</th>
          <th className="interval-column">Intervalo</th>
          <th className="options-column"></th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(availabilities).map(([day, schedule]) =>
          orderSchedules(schedule).map((sched, idx) => (
            <tr className="dashboard_professional-item">
              {idx === 0 && (
                <td rowSpan={schedule.length} className="day-row">
                  <strong>{getSpanishDay(day)}</strong>
                </td>
              )}
              <td className="from-row">{sched.startTime}hs</td>
              <td className="to-row">{sched.endTime}hs</td>
              <td>{sched.interval} min.</td>
              <td className="options-row">
                <p className="edit">Editar</p>
                <p className="delete">Eliminar</p>
              </td>
              {/* <div className="divider-line_container">
                <hr className="divider-line" />
                </div> */}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default SchedulesProfessionalDashboard;
