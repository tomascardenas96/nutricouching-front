import { FaRegTrashAlt } from "react-icons/fa";
import { HOST } from "../../../../../../../api/data";
import "./NewProfessionalAbmCard.css";

function NewProfessionalAbmCard({ professional, openDeleteProfessionalModal }) {
  return (
    <div className="professional-abm-card">
      <div className="professional-abm_image">
        {professional.profile.picture ? (
          <img
            src={professional.profile.picture}
            alt="professional-abm-image"
          />
        ) : (
          <img src="/assets/no-pic.jpg" alt="Profesional sin foto de perfil" />
        )}
      </div>

      <div className="professional-abm_fullname">
        <p>{professional.fullname}</p>
        <p>{professional.email}</p>
      </div>

      <div
        className="professional-abm_options"
        onClick={() => openDeleteProfessionalModal(professional.professionalId)}
      >
        <FaRegTrashAlt />
      </div>
    </div>
  );
}

export default NewProfessionalAbmCard;
