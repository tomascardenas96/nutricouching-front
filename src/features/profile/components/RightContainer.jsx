import "./RightContainer.css";
import { GrLocation } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";

function RightContainer() {
  return (
    <div className="profile-posts_right-container">
      <div className="professional-section professional-information">
        <h1>Información de Contacto</h1>
        <div>
          <p>
            <GrLocation className="icons" /> Benito Juarez, Argentina
          </p>
          <p>
            <MdOutlinePhone className="icons" /> +529 2281-378525
          </p>
          <p>
            <FaRegEnvelope className="icons" /> tomicardenas96@gmail.com
          </p>
        </div>
      </div>

      <div className="professional-section professional-specialties">
        <h1>Especialidades</h1>
        <div>
          <p>Nutrición Deportiva</p>
          <p>Suplementación</p>
          <p>Composición Corporal</p>
          <p>Nutricion Pediátrica</p>
        </div>
      </div>
    </div>
  );
}

export default RightContainer;
