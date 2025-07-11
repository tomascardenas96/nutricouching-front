import { FaCamera } from "react-icons/fa";
import ModalWindow from "../../../../common/components/dashboard/ModalWindow";
import "./UploadPhotoModal.css";
import useUpdateProfilePhoto from "../../hooks/useUpdateProfilePhoto";

function UploadPhotoModal({ profileId, onClose, setProfessionalProfile }) {
  const {
    fileName,
    noFileSelected,
    handleFileChange,
    handleUpdateProfilePhoto,
  } = useUpdateProfilePhoto(onClose, setProfessionalProfile);

  return (
    <ModalWindow
      title="Actualizar foto de perfil"
      onSubmit={(e) => handleUpdateProfilePhoto(e, profileId)}
      onClose={onClose}
      buttonText="Actualizar Foto"
      isButtonEnabled={!!!noFileSelected}
    >
      <div className="upload-photo-modal">
        <label className="upload-photo_input" htmlFor="upload-photo">
          <div>
            <input type="file" id="upload-photo" onChange={handleFileChange} />
            <FaCamera />
            Subir foto
          </div>

          <p>{noFileSelected || fileName}</p>
        </label>
      </div>
    </ModalWindow>
  );
}

export default UploadPhotoModal;
