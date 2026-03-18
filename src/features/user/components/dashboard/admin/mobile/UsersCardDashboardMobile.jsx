import { memo } from "react";
import { createPortal } from "react-dom";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useBlockUser from "../../../../hooks/useDeleteUser";
import "./UsersCardDashboardMobile.css";

const ROLE_LABELS = {
  root: "Root",
  professional: "Profesional",
  user: "Usuario",
};

const UsersCardDashboardMobile = memo(function UsersCardDashboardMobile({ user, setUsers }) {
  const { isDeleteModalOpen, openDeleteModal, closeDeleteModal, handleDeleteUser } =
    useBlockUser(setUsers);

  return (
    <>
      <div className={`user-card-dashboard-container${user.isDisabled ? " user-card--blocked" : ""}`}>
        <div className="user-card__avatar">
          {user.name?.[0]?.toUpperCase()}
        </div>

        <div className="info-container">
          <div className="user-card__header">
            <p className="name">{user.name} {user.lastname}</p>
            <span className={`role-badge role-badge--${user.role}`}>
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
          </div>

          <p className="email">{user.email}</p>

          <div className="buttons-container">
            <button
              className={`delete-btn${user.isDisabled ? " delete-btn--unblock" : ""}`}
              onClick={() => openDeleteModal(user)}
            >
              {user.isDisabled ? <RiLockUnlockLine /> : <RiLockLine />}
              {user.isDisabled ? "Desbloquear" : "Bloquear"}
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmationModal
            message={user.isDisabled ? "¿Deseas desbloquear este usuario?" : "¿Deseas bloquear este usuario?"}
            onConfirm={handleDeleteUser}
            onClose={closeDeleteModal}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
});

export default UsersCardDashboardMobile;
