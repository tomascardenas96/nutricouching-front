import React, { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useDeleteProfessional(setProfessionals) {
  const [selectedProfessionalId, setSelectedProductId] = useState(null);
  const [isDeleteProfessionalModalOpen, setIsDeleteProfessionalModalOpen] =
    useState(false);

  const openDeleteProfessionalModal = (professionalId) => {
    setSelectedProductId(professionalId);
    setIsDeleteProfessionalModalOpen(true);
  };

  const closeDeleteProfessionalModal = () => {
    setSelectedProductId(null);
    setIsDeleteProfessionalModalOpen(false);
  };

  const handleDeleteProfessional = () => {
    const deleteProfessional = async () => {
      const response = await fetch(
        `${HOST}/professional/delete/${selectedProfessionalId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(deleteProfessional(), {
      success: () => {
        setProfessionals((prev) =>
          prev.filter((prof) => prof.professionalId !== selectedProfessionalId)
        );
        setIsDeleteProfessionalModalOpen(false);
        return "Profesional eliminado";
      },
      loading: "Cargando...",
      error: "Error al eliminar un profesional",
    });
  };

  return {
    openDeleteProfessionalModal,
    closeDeleteProfessionalModal,
    handleDeleteProfessional,
    isDeleteProfessionalModalOpen,
  };
}

export default useDeleteProfessional;
