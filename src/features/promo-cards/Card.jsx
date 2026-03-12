import { FaArrowRight } from "react-icons/fa6";
import "./Card.css";

function Card({ title, description, color }) {
  return (
    <div className="card__container" style={{ background: color }}>
      <h1 className="card__title">{title}</h1>
      <h2 className="card__description">{description}</h2>
      <p className="card__more">
        <FaArrowRight /> Ver Todos
      </p>
    </div>
  );
}

export default Card;
