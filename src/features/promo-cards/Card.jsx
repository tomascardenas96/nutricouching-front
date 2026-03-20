import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./Card.css";

function Card({ title, description, color, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="card__container"
      style={{ background: color }}
      onClick={handleClick}
    >
      <h1 className="card__title">{title}</h1>
      <h2 className="card__description">{description}</h2>
    </div>
  );
}

export default Card;
