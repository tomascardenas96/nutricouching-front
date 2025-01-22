import "./BookingsHeader.css";
import { IoTime } from "react-icons/io5";

function BookingsHeader({ date }) {
  return (
    <div className="bookings-header_container">
      <p>{date}</p>
      <p>
        Horarios <IoTime />
      </p>
    </div>
  );
}

export default BookingsHeader;
