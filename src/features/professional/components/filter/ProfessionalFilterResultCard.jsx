import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import "./ProfessionalFilterResultCard.css";
import { professionalSpecialties } from "../../../../lib/professional";

function ProfessionalFilterResultCard({ fullname, image, specialties }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !image || imgError;

  return (
    <div className="pro-card">
      <div className="pro-card__image-wrap">
        {showFallback ? (
          <span className="pro-card__avatar-fallback">
            {fullname?.charAt(0).toUpperCase()}
          </span>
        ) : (
          <img
            src={image}
            alt={fullname}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
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
