import { FaCamera } from "react-icons/fa";
import { HOST } from "../../../api/data";
import "./ProfilePicture.css";

function ProfilePicture({ image }) {
  return (
    <div className="profile-picture">
      {!image ? (
        <img
          src="/src/public/assets/no-pic.jpg"
          alt="Foto de perfil de profesional sin URL seleccionada"
        />
      ) : (
        <img
          src={`${HOST}/uploads/professionals/profile/${image}`}
          alt="Foto de perfil del profesional en Cohesiva Salud"
        />
      )}
      <label className="upload-icon" htmlFor="upload-professional-file">
        <input type="file" id="upload-professional-file" />
        <FaCamera />
      </label>
    </div>
  );
}

export default ProfilePicture;
