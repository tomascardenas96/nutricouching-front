import { useNavigate } from "react-router-dom";
import { HOST } from "../../api/data";
import "./ResultCard.css";

function ResultCard({ image, fullname, specialties, profilename }) {
  const navigate = useNavigate();

  const professionalSpecialties = () => {
    if (!specialties.length) return `Sin especialidad`;
    if (specialties.length === 1) return `${specialties[0]?.name}`;
    if (specialties.length <= 2)
      return `${specialties[0]?.name} y ${specialties[1]?.name}`;

    return `${specialties[0]?.name} y ${specialties?.length - 1} más`;
  };

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
          <span>{professionalSpecialties()}</span>
        </div>
      </div>

      <p></p>
    </li>
  );
}

export default ResultCard;
