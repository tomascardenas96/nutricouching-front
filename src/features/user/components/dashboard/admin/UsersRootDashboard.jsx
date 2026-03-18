import { createPortal } from "react-dom";
import { useState } from "react";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";
import { LuShieldOff } from "react-icons/lu";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useBlockUser from "../../../hooks/useDeleteUser";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import "./UsersRootDashboard.css";

const ROLE_LABELS = {
  root: "Root",
  professional: "Profesional",
  user: "Usuario",
};

function UsersRootDashboard() {
  const { users, setUsers, usersLoading, usersError } = useGetAllUsers();
  const { searchTerm } = useSelectMenuOption();
  const { isDeleteModalOpen, selectedUser, openDeleteModal, closeDeleteModal, handleDeleteUser } =
    useBlockUser(setUsers);
  const [showBanned, setShowBanned] = useState(false);

  const bannedCount = users.filter((u) => u.isDisabled).length;

  const filtered = users.filter((u) => {
    if (showBanned && !u.isDisabled) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.lastname?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="users-dashboard-container">
        <div className="users-dashboard_filters">
          <button
            className={`users-filter-chip${showBanned ? " users-filter-chip--active" : ""}`}
            onClick={() => setShowBanned((prev) => !prev)}
          >
            <LuShieldOff className="users-filter-chip__icon" />
            Baneados
            {bannedCount > 0 && (
              <span className="users-filter-chip__count">{bannedCount}</span>
            )}
          </button>
        </div>

        {usersError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : usersLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length > 0 ? (
          <table className="users-root-dashboard_table">
            <thead>
              <tr>
                <th className="avatar-column"></th>
                <th>Nombre</th>
                <th className="lastname-column">Apellido</th>
                <th className="email-column">E-mail</th>
                <th className="role-column">Rol</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr
                  className={`dashboard_users-item${user.isDisabled ? " dashboard_users-item--blocked" : ""}`}
                  key={`user-${user.userId}`}
                >
                  <td className="avatar-row">
                    <div className="user-avatar-wrap">
                      <div className="user-avatar">
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                      {user.isDisabled && (
                        <span className="user-avatar__lock">
                          <RiLockLine />
                        </span>
                      )}
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td className="lastname-row">{user.lastname}</td>
                  <td className="email-row">{user.email}</td>
                  <td className="role-row">
                    <span className={`role-badge role-badge--${user.role}`}>
                      {ROLE_LABELS[user.role] ?? user.role}
                    </span>
                  </td>
                  <td className="options-row">
                    <button
                      className={`user-action-chip${user.isDisabled ? " user-action-chip--unblock" : " user-action-chip--block"}`}
                      onClick={() => openDeleteModal(user)}
                    >
                      {user.isDisabled ? <RiLockUnlockLine /> : <RiLockLine />}
                      {user.isDisabled ? "Desbloquear" : "Bloquear"}
                    </button>
                  </td>
                  <td className="divider-line_container">
                    <hr className="divider-line" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-users">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay usuarios aún"}
          </p>
        )}
      </div>

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmationModal
            message={selectedUser?.isDisabled ? "¿Deseas desbloquear este usuario?" : "¿Deseas bloquear este usuario?"}
            onConfirm={handleDeleteUser}
            onClose={closeDeleteModal}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default UsersRootDashboard;
