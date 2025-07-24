import { FaArrowRight } from "react-icons/fa";
import { HOST } from "../../../../api/data";
import "./ProfessionalFilterResultCard.css";
import { professionalSpecialties } from "../../../../lib/professional";

function ProfessionalFilterResultCard({ fullname, image, specialties }) {
  return (
    <div className="professional-filter-result-card">
      <div className="result-professional_image">
        <img
          src={image}
          alt="Foto de perfil de usuario dentro del filtro"
        />
      </div>

      <div className="result-professional_user-information">
        <h1>{fullname}</h1>
        <p>{professionalSpecialties(specialties)}</p>
      </div>

      <div className="result-professional_navigate-profile">
        <p>Ver Perfil</p>
        <FaArrowRight className="arrow-icon" />
      </div>
    </div>
  );
}

export default ProfessionalFilterResultCard;
