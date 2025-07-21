import { useState } from "react";
import "./CoverPhoto.css";
import { FaCamera } from "react-icons/fa";
import { HOST } from "../../../api/data";
import { createPortal } from "react-dom";
import UploadCoverModal from "./modals/UploadCoverModal";

function CoverPhoto({
  children,
  image,
  profileId,
  setProfessionalProfile,
  isProfileOwner,
}) {
  const [isUploadCoverModalOpen, setIsUploadCoverModalOpen] = useState(false);

  return (
    <>
      <div className="cover-photo">
        {!image ? (
          <img
            src="/assets/no-pic.jpg"
            alt="Foto de perfil de profesional sin URL seleccionada"
          />
        ) : (
          <img
            src={`${HOST}/uploads/professionals/cover/${image}`}
            alt="Foto de portada del profesional en Cohesiva Salud"
          />
        )}
        {isProfileOwner && (
          <label
            className="upload-cover-photo"
            onClick={() => setIsUploadCoverModalOpen(true)}
          >
            <FaCamera className="camera-icon" />
            <p>Cambiar foto de portada</p>
          </label>
        )}
        {children}
      </div>

      {isUploadCoverModalOpen &&
        createPortal(
          <UploadCoverModal
            profileId={profileId}
            onClose={() => setIsUploadCoverModalOpen(false)}
            setProfessionalProfile={setProfessionalProfile}
          />,
          document.getElementById("profile")
        )}
    </>
  );
}

export default CoverPhoto;
