import { FaCamera } from "react-icons/fa";
import { HOST } from "../../../api/data";
import "./ProfilePicture.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

function ProfilePicture({ image }) {
  const [isFullPhotoSelected, setIsFullPhotoSelected] = useState(false);

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
          onClick={() => setIsFullPhotoSelected(true)}
        />
      )}
      <label className="upload-icon" htmlFor="upload-professional-file">
        <input type="file" id="upload-professional-file" />
        <FaCamera />
      </label>

      {isFullPhotoSelected &&
        createPortal(
          <div className="full-size-image_container">
            <div>
              <img
                src={`${HOST}/uploads/professionals/profile/${image}`}
                alt="Foto de perfil del profesional en Cohesiva Salud"
                onClick={() => setIsFullPhotoSelected(true)}
              />

              <IoMdClose
                className="close-icon"
                onClick={() => setIsFullPhotoSelected(false)}
              />
            </div>
          </div>,
          document.getElementById("profile")
        )}
    </div>
  );
}

export default ProfilePicture;
