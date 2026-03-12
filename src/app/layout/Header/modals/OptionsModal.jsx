import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import "./OptionsModal.css";

function OptionsModal({ onClose, handleOpenUpdateUserModal, handleLogOut }) {
  const { user } = useAuth();

  return (
    <div className="options-modal_container">
      <div className="options-modal__header">
        <p className="options-modal__name">{user?.name} {user?.lastname}</p>
        <span className="options-modal__email">{user?.email}</span>
      </div>

      <div className="options-modal__divider" />

      {user?.professional && (
        <p className="options-modal__item" onClick={onClose}>
          <Link to={`/profile/${user?.professional?.profile?.profileName}`}>
            Mi perfil
          </Link>
        </p>
      )}

      <p
        className="options-modal__item"
        onClick={() => {
          onClose();
          handleOpenUpdateUserModal();
        }}
      >
        Actualizar datos
      </p>

      <div className="options-modal__divider" />

      <p
        className="options-modal__item options-modal__item--logout"
        onClick={handleLogOut}
      >
        <RiLogoutBoxRLine />
        Cerrar sesión
      </p>
    </div>
  );
}

export default OptionsModal;
