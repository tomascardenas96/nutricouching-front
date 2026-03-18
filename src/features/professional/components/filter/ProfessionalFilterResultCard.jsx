import { FaArrowRight } from "react-icons/fa";
import "./ProfessionalFilterResultCard.css";
import { professionalSpecialties } from "../../../../lib/professional";

function ProfessionalFilterResultCard({ fullname, image, specialties }) {
  return (
    <div className="pro-card">
      <div className="pro-card__image-wrap">
        <img
          src={image || "/assets/no-picture-profile.webp"}
          alt={fullname}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "/assets/no-picture-profile.webp"; }}
        />
      </div>

      <div className="pro-card__body">
        <p className="pro-card__specialty">{professionalSpecialties(specialties)}</p>
        <h2 className="pro-card__name">{fullname}</h2>

        <div className="pro-card__cta">
          Ver perfil
          <FaArrowRight className="pro-card__cta-arrow" />
        </div>
      </div>
    </div>
  );
}

export default ProfessionalFilterResultCard;
