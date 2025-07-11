import ModalWindow from "../../../../common/components/dashboard/ModalWindow";
import "./UpdateProfileModal.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import useUpdateProfileInfo from "../../hooks/useUpdateProfileInfo";

function UpdateProfileModal({
  handleCloseUpdateProfileModal,
  professionalProfile,
  setProfessionalProfile,
}) {
  const {
    handleUpdateProfileInfo,
    updateProfileInput,
    handleChangeUpdateProfileInput,
  } = useUpdateProfileInfo(professionalProfile, setProfessionalProfile, handleCloseUpdateProfileModal);

  return (
    <ModalWindow
      title="Actualizar Perfil"
      buttonText="Guardar"
      onClose={handleCloseUpdateProfileModal}
      isButtonEnabled={true}
      onSubmit={handleUpdateProfileInfo}
    >
      {/* Inputs */}
      <div className="update-profile-modal">
        <label htmlFor="profileName">
          <div>
            Nombre de Perfil <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="profileName"
            placeholder="nombre-de-perfil123"
            value={updateProfileInput.profileName}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <label htmlFor="bio">
          <div>
            Biografia <span>* (Opcional)</span>
          </div>
          <textarea
            type="text"
            name="bio"
            placeholder="Profesional en alimentación dedicada a promover hábitos saludables y..."
            value={updateProfileInput.bio}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <label htmlFor="location">
          <div>
            Ubicacion <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="location"
            placeholder="Benito Juarez, Argentina"
            value={updateProfileInput.location}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <label htmlFor="phone" className="phone-input">
          <div>
            Telefono <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="phone"
            placeholder="XXXX-XXXXXX"
            value={updateProfileInput.phone}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <h2>
          <FaUserFriends /> Redes Sociales
        </h2>

        <hr />

        <label htmlFor="facebook" className="facebook-input">
          <div>
            <FaFacebookF /> Facebook <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="facebook"
            placeholder="www.facebook.com/tu-perfil"
            value={updateProfileInput.facebook}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <label htmlFor="instagram">
          <div>
            <FaInstagram /> Instagram <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="instagram"
            placeholder="www.instagram.com/tu-perfil"
            value={updateProfileInput.instagram}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <label htmlFor="x">
          <div>
            <FaXTwitter /> X <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="x"
            placeholder="www.x.com/tu-perfil"
            value={updateProfileInput.x}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>

        <hr />

        <label htmlFor="tiktok">
          <div>
            <FaTiktok /> Tik Tok <span>* (Opcional)</span>
          </div>
          <input
            type="text"
            name="tiktok"
            placeholder="www.tiktok.com/tu-perfil"
            value={updateProfileInput.tiktok}
            onChange={handleChangeUpdateProfileInput}
          />
        </label>
      </div>
      ;
    </ModalWindow>
  );
}

export default UpdateProfileModal;
