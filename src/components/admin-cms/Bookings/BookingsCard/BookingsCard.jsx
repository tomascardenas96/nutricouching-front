import "./BookingsCard.css";

function BookingsCard({ name, specialty, timetable }) {
  return (
    <div className="bookings-card_container">
      <div className="left">
        <p>{name}</p>
        <p>{timetable}</p>
      </div>

      <div className="right">
        <p>{specialty}</p>
        <button>Cancelar Turno</button>
      </div>
    </div>
  );
}

export default BookingsCard;
