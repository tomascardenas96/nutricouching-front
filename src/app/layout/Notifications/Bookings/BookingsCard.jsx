import "./BookingsCard.css";

function BookingsCard({
  name,
  specialty,
  startTimetable,
  endTimetable,
  id,
  setSelectedBookingId,
  handleOpenConfirmationDeleteBooking,
}) {
  const handleCancel = () => {
    setSelectedBookingId(id);
    handleOpenConfirmationDeleteBooking();
  };

  const formatTime = (t) => t?.slice(0, 5) + "hs";

  return (
    <div className="booking-card">
      <div className="booking-card__left">
        <h4 className="booking-card__name">{name}</h4>
        <p className="booking-card__id">{id}</p>
        <p className="booking-card__time">
          {formatTime(startTimetable)} - {formatTime(endTimetable)}
        </p>
      </div>

      <button className="booking-card__cancel" onClick={handleCancel}>
        Cancelar turno
      </button>
    </div>
  );
}

export default BookingsCard;
