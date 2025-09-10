import "./SchedulesCardDashboardMobile.css";

function SchedulesCardDashboardMobile({
  day,
  startTime,
  endTime,
  interval,
  onDelete,
}) {
  return (
    <div className="schedule-card-dashboard-container">
      <div className="info-container">
        <p className="user-name">{day}</p>

        <div className="schedule-details">
          <p>
            <span>Desde:</span> {startTime}hs
          </p>
          <p>
            <span>Hasta:</span> {endTime}hs
          </p>
          <p>
            <span>Intervalo:</span> {interval} min.
          </p>
        </div>

        <div className="buttons-container">
          <button className="cancel-btn" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SchedulesCardDashboardMobile;
