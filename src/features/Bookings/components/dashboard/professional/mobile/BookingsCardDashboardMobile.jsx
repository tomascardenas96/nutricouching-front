import "./BookingsCardDashboardMobile.css";

function BookingsCardDashboardMobile({ booking, date, specialty, onCancel }) {
  return (
    <div className="booking-card-dashboard-container">
      <div className="info-container">
        <p className="user-name">
          {booking.user.name} {booking.user.lastname}
        </p>

        <div className="booking-details">
          <p>
            <span>Fecha:</span> {date}
          </p>
          <p>
            <span>Especialidad:</span> {specialty}
          </p>
          <p>
            <span>Desde:</span> {booking.startTime.slice(0, 5)}hs
          </p>
          <p>
            <span>Hasta:</span> {booking.endTime.slice(0, 5)}hs
          </p>
        </div>

        <div className="buttons-container">
          <button className="cancel-btn" onClick={onCancel}>
            Cancelar turno
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingsCardDashboardMobile;
