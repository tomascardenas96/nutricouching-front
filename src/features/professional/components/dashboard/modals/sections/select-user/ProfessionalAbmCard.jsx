import { FaRegTrashAlt } from "react-icons/fa";
import { HOST } from "../../../../../../../api/data";
import "./ProfessionalAbmCard.css";

function ProfessionalAbmCard({ professional, openDeleteProfessionalModal }) {
  return (
    <div className="professional-abm-card">
      <div className="professional-abm_image">
        <img
          src={`${HOST}/uploads/professionals/${professional.image}`}
          alt="professional-abm-image"
        />
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

export default ProfessionalAbmCard;
