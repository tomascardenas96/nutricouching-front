import { FaCamera } from "react-icons/fa";
import ModalWindow from "../../../common/components/dashboard/ModalWindow";
import useUpdateProfileCover from "../hooks/useUpdateProfileCover";
import "./UploadCoverModal.css";

function UploadCoverModal({ profileId, onClose, setProfessionalProfile }) {
  const {
    fileName,
    noFileSelected,
    handleFileChange,
    handleUpdateProfileCoverPhoto,
  } = useUpdateProfileCover(onClose, setProfessionalProfile);

  return (
    <ModalWindow
      title="Actualizar foto de portada"
      onSubmit={(e) => handleUpdateProfileCoverPhoto(e, profileId)}
      onClose={onClose}
      buttonText="Actualizar Foto"
      isButtonEnabled={!!!noFileSelected}
    >
      <div className="upload-cover-modal">
        <label className="upload-cover_input" htmlFor="upload-cover">
          <div>
            <input type="file" id="upload-cover" onChange={handleFileChange} />
            <FaCamera />
            Subir foto
          </div>

          <p>{noFileSelected || fileName}</p>
        </label>
      </div>
    </ModalWindow>
  );
}

export default UploadCoverModal;
