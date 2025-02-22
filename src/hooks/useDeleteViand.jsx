import React, { useState } from "react";
import { HOST } from "../api/data";
import { toast } from "sonner";

function useDeleteViand(setViands) {
  const authToken = localStorage.getItem("authToken");

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
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
