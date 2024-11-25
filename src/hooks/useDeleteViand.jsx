import React, { useState } from "react";
import { HOST } from "../api/data";
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
      const response = await fetch(`${HOST}/viand/delete/${selectedViandId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = response.json();

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
