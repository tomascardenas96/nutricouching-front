import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useBlockUser(setUsers) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteUser = () => {
    const user = selectedUser;
    const willBlock = !user.isDisabled;

    const toggleBlock = async () => {
      await apiClient.patch(`/user/${user.userId}/block`, { isDisabled: willBlock });
    };

    toast.promise(toggleBlock(), {
      loading: willBlock ? "Bloqueando usuario..." : "Desbloqueando usuario...",
      success: () => {
        setUsers((prev) =>
          prev.map((u) =>
            u.userId === user.userId ? { ...u, isDisabled: willBlock } : u
          )
        );
        closeDeleteModal();
        return willBlock ? "Usuario bloqueado" : "Usuario desbloqueado";
      },
      error: willBlock ? "Error al bloquear el usuario" : "Error al desbloquear el usuario",
    });
  };

  return { isDeleteModalOpen, selectedUser, openDeleteModal, closeDeleteModal, handleDeleteUser };
}

export default useBlockUser;
