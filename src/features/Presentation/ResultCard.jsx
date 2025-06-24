import { useNavigate } from "react-router-dom";
import { HOST } from "../../api/data";
import "./ResultCard.css";
import { professionalSpecialties } from "../../lib/professional";

function ResultCard({ image, fullname, specialties, profilename }) {
  const navigate = useNavigate();

  return (
    <li
      className="result-card"
      onClick={() => navigate(`/profile/${profilename}`)}
    >
      <div className="result-card_image">
        <img
          src={`${HOST}/uploads/professionals/profile/${image}`}
          alt="Foto del profesional en la busqueda por filtro de Cohesiva Salud"
        />
      </div>

      <div className="result-card_info">
        <p>{fullname}</p>
        <div>
          <span>{professionalSpecialties(specialties)}</span>
        </div>
      </div>

      <p></p>
    </li>
  );
}

export default ResultCard;
