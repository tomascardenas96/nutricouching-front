import React, { useState } from "react";
import apiClient from "../../auth/api/apiClient";
import { toast } from "sonner";

function useDeleteViand(setViands) {

  const [isDeleteViandModalOpen, setIsDeleteViandModalOpen] = useState(false);
  const [selectedViandId, setSelectedViandId] = useState(null);

  const openDeleteViandModal = (viandId) => {
    setSelectedViandId(viandId);
    setIsDeleteViandModalOpen(true);
  };

  const closeDeleteViandModal = () => {
    setSelectedViandId(null);
    setIsDeleteViandModalOpen(false);
  };

  const handleDeleteViand = () => {
    const deleteViand = async () => {
      const { data } = await apiClient.delete(`/viand/delete/${selectedViandId}`);
      return data;
    };

    toast.promise(deleteViand(), {
      success: () => {
        setViands((prev) =>
          prev.filter((viand) => viand.viandId !== selectedViandId)
        );
        closeDeleteViandModal();
        return "Vianda eliminada correctamente";
      },
      loading: "Cargando...",
      error: "Error al eliminar vianda",
    });
  };
  
  return {
    isDeleteViandModalOpen,
    openDeleteViandModal,
    closeDeleteViandModal,
    handleDeleteViand,
  };
}

export default useDeleteViand;
