import { Link } from "react-router-dom";
import { useAuthUser } from "../../../../features/auth/hooks/useAuthUser";
import "./OptionsModal.css";

function OptionsModal({ onClose, handleOpenUpdateUserModal }) {
  const { user } = useAuthUser();

  return (
    <div className="options-modal_container">
      {user?.professional && (
        <p onClick={onClose}>
          <Link to={`/profile/${user?.professional?.profile?.profileName}`}>
            Mi perfil
          </Link>
        </p>
      )}
      <p
        onClick={() => {
          onClose();
          handleOpenUpdateUserModal();
        }}
      >
        Actualizar datos
      </p>
    </div>
  );
}

export default OptionsModal;
