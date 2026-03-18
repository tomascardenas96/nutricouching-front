import { useState } from "react";
import { createPortal } from "react-dom";
import { FaCamera } from "react-icons/fa";
import "./CoverPhoto.css";
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
          <div className="cover-photo__default" aria-hidden="true">
            <div className="cover-photo__default-grain" />
          </div>
        ) : (
          <img
            src={image}
            alt="Foto de portada del profesional en Cohesiva Salud"
          />
        )}
        {isProfileOwner && (
          <label
            className="upload-cover-photo"
            onClick={() => setIsUploadCoverModalOpen(true)}
          >
            <FaCamera className="camera-icon" />
            <p className="desktop_cover-btn">Cambiar foto de portada</p>
            <p className="mobile_cover-btn">Portada</p>
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
