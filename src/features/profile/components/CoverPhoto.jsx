import "./CoverPhoto.css";
import { FaCamera } from "react-icons/fa";

function CoverPhoto({ children }) {
  return (
    <div className="cover-photo">
      <img
        src="/src/public/assets/banner1.jpg"
        alt="Foto de portada del profesional de Cohesiva Salud"
      />
      <label className="upload-cover-photo">
        <FaCamera className="camera-icon" />
        <p>Cambiar foto de portada</p>
        <input type="file" name="" id="" />
      </label>
      {children}
    </div>
  );
}

export default CoverPhoto;
