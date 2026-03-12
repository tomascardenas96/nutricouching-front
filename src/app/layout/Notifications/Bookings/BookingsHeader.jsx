import "./BookingsHeader.css";

function BookingsHeader({ date }) {
  // Evita el cambio de zona horaria interpretando la fecha como local pura
  const [year, month, day] = date.split("-");
  const localDate = new Date(year, month - 1, day);

  const formattedDate = localDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="booking-header">
      <h3 className="booking-header__date">{formattedDate}</h3>
      <div className="booking-header__line" />
    </div>
  );
}

export default BookingsHeader;
