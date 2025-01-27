import "./BookingsHeader.css";
import { IoTime } from "react-icons/io5";

function BookingsHeader({ date }) {
  // Convertimos la fecha al formato [nombre del dia], [numero del dia] DE [mes] DEL [año].
  const parseDate = (date) => {
    const weekDays = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const dateObj = new Date(date + "T00:00:00");
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (
      today.getFullYear() === dateObj.getFullYear() &&
      today.getMonth() === dateObj.getMonth() &&
      today.getDate() === dateObj.getDate()
    ) {
      return "Hoy";
    }

    if (
      tomorrow.getFullYear() === dateObj.getFullYear() &&
      tomorrow.getMonth() === dateObj.getMonth() &&
      tomorrow.getDate() === dateObj.getDate()
    ) {
      return "Mañana";
    }

    return `${weekDays[dateObj.getDay()]}, ${dateObj.getDate()} de ${
      months[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
  };

  return (
    <div className="bookings-header_container">
      <p>{parseDate(date)}</p>
      <p>
        Horarios <IoTime />
      </p>
    </div>
  );
}

export default BookingsHeader;
