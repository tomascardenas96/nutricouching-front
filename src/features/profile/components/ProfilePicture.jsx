import { FaCamera } from "react-icons/fa";
import { HOST } from "../../../api/data";
import "./ProfilePicture.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import UploadPhotoModal from "./modals/UploadPhotoModal";

function ProfilePicture({
  image,
  profileId,
  setProfessionalProfile,
  isProfileOwner,
}) {
  const [isFullPhotoSelected, setIsFullPhotoSelected] = useState(false);
  const [isUploadProfilePictureOpen, setIsUploadProfilePictureOpen] =
    useState(false);

  return (
    <div className="profile-picture">
      {!image ? (
        <img
          src="/assets/no-pic.jpg"
          alt="Foto de perfil de profesional sin URL seleccionada"
        />
      ) : (
        <img
          src={image}
          alt="Foto de perfil del profesional en Cohesiva Salud"
          onClick={() => setIsFullPhotoSelected(true)}
        />
      )}
      {isProfileOwner && (
        <label
          className="upload-icon"
          htmlFor="upload-professional-file"
          onClick={() => setIsUploadProfilePictureOpen(true)}
        >
          <FaCamera />
        </label>
      )}

      {isFullPhotoSelected &&
        createPortal(
          <div className="full-size-image_container">
            <div>
              <img
                src={image}
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

      {isUploadProfilePictureOpen &&
        createPortal(
          <UploadPhotoModal
            profileId={profileId}
            onClose={() => setIsUploadProfilePictureOpen(false)}
            setProfessionalProfile={setProfessionalProfile}
          />,
          document.getElementById("profile")
        )}
    </div>
  );
}

export default ProfilePicture;
