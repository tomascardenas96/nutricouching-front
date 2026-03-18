import { useQuery } from "@tanstack/react-query";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import apiClient from "../../../../features/auth/api/apiClient";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import "./OptionsModal.css";

const PROFESSIONAL_ROLES = ["root", "admin", "professional"];

function OptionsModal({ onClose, handleOpenUpdateUserModal, handleLogOut }) {
  const { user } = useAuth();

  const isProfessional = PROFESSIONAL_ROLES.includes(user?.role);

  const { data: activeUser } = useQuery({
    queryKey: ["active-user"],
    queryFn: () => apiClient.get("/auth/active-user").then((r) => r.data),
    enabled: isProfessional,
    staleTime: 1000 * 60 * 5,
  });

  const profileName = activeUser?.professional?.profile?.profileName;

  return (
    <div className="options-modal_container">
      <div className="options-modal__header">
        <p className="options-modal__name">{user?.name} {user?.lastname}</p>
        <span className="options-modal__email">{user?.email}</span>
      </div>

      <div className="options-modal__divider" />

      {isProfessional && profileName && (
        <p className="options-modal__item" onClick={onClose}>
          <Link to={`/profile/${profileName}`}>
            Ver perfil
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
