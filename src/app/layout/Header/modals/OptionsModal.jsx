import { useQuery } from "@tanstack/react-query";
import { FiSettings, FiUser } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import apiClient from "../../../../features/auth/api/apiClient";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import "./OptionsModal.css";

const PROFESSIONAL_ROLES = ["root", "admin", "professional"];

const ROLE_LABELS = {
  root: "Super Admin",
  admin: "Administrador",
  professional: "Profesional",
  user: "Usuario",
};

function OptionsModal({ onClose, handleOpenUpdateUserModal, handleLogOut }) {
  const { user } = useAuth();

  const isProfessional = PROFESSIONAL_ROLES.includes(user?.role);

  const { data: activeUser } = useQuery({
    queryKey: ["active-user", user?.userId],
    queryFn: () => apiClient.get("/auth/active-user").then((r) => r.data),
    enabled: isProfessional && !!user?.userId,
    staleTime: 1000 * 60 * 5,
  });

  const profileName = activeUser?.professional?.profile?.profileName;
  const initials = `${user?.name?.[0] ?? ""}${user?.lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="options-modal">
      {/* Avatar + info */}
      <div className="options-modal__header">
        <div className="options-modal__avatar">{initials}</div>
        <div className="options-modal__user-info">
          <p className="options-modal__name">
            {user?.name} {user?.lastname}
          </p>
          <span className="options-modal__email">{user?.email}</span>
          {user?.role && (
            <span className="options-modal__badge">
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
          )}
        </div>
      </div>

      <div className="options-modal__divider" />

      {isProfessional && profileName && (
        <Link
          to={`/profile/${profileName}`}
          className="options-modal__item"
          onClick={onClose}
        >
          <FiUser className="options-modal__item-icon" />
          Ver perfil
        </Link>
      )}

      <button
        className="options-modal__item"
        onClick={() => {
          onClose();
          handleOpenUpdateUserModal();
        }}
      >
        <FiSettings className="options-modal__item-icon" />
        Actualizar datos
      </button>

      <div className="options-modal__divider" />

      <button
        className="options-modal__item options-modal__item--logout"
        onClick={handleLogOut}
      >
        <RiLogoutBoxRLine className="options-modal__item-icon" />
        Cerrar sesión
      </button>
    </div>
  );
}

export default OptionsModal;
