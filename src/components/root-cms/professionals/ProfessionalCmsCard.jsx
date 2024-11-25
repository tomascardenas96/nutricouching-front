import { HOST } from "../../../api/data";
import "./ProfessionalCmsCard.css";

import React from "react";

function ProfessionalCmsCard({ professional }) {
  return (
    <>
      <td className="cms-professional_name">
        <div className="professional-img">
          <img
            src={`${HOST}/uploads/professionals/${professional.image}`}
            alt="professional-picture"
          />
        </div>
        <h1 className="professional-fullname">{professional.fullname}</h1>
        <p className="professional-email">{professional.email}</p>
      </td>
      <td className="cms-professional_specialty">{professional.specialty}</td>
    </>
  );
}

export default ProfessionalCmsCard;
