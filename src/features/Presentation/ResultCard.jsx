import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./ResultCard.css";
import { professionalSpecialties } from "../../lib/professional";

function ResultCard({ image, fullname, specialties, profilename }) {
  const navigate = useNavigate();

  return (
    <li
      className="result-card"
      onClick={() => navigate(`/profile/${profilename}`)}
    >
      <div className="result-card__avatar">
        {image ? (
          <img src={image} alt={`Foto de ${fullname}`} />
        ) : (
          <span className="result-card__avatar-fallback">
            {fullname?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="result-card__body">
        <span className="result-card__name">{fullname}</span>
        <span className="result-card__specialty">
          {professionalSpecialties(specialties)}
        </span>
      </div>

      <IoIosArrowForward className="result-card__arrow" />
    </li>
  );
}

export default ResultCard;
