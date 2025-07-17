import "./QuoteCard.css";
import { FaStar } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

function QuoteCard({ message, name, index }) {
  const colors = ["#E6A10B", "#4055C8", "#F25E61"];

  return (
    <div className="quote-card">
      <div className="quote-icon">
        <div>
          <BiSolidQuoteAltLeft style={{ color: colors[index] }} />
        </div>
      </div>

      <div className="body">
        <p>{message}</p>

        <div className="name">
          <h1>{name}</h1>
          <div className="stars-icon-list">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
