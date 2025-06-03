import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDeleteProfessional(
  setProfessionals,
  selectedProfessional,
  handleCloseDeleteModal
) {
  const handleDeleteProfessional = () => {
    const authToken = localStorage.getItem("authToken");
    const deleteProfessional = async () => {
      const response = await fetch(
        `${HOST}/professional/delete/${selectedProfessional.professionalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(deleteProfessional(), {
      success: () => {
        handleCloseDeleteModal();
        setProfessionals((prev) =>
          prev.filter(
            (prof) =>
              prof.professionalId !== selectedProfessional.professionalId
          )
        );
        setIsDeleteProfessionalModalOpen(false);
        return "Profesional eliminado";
      },
      loading: "Cargando...",
      error: "Error al eliminar un profesional",
    });
  };

  return {
    handleDeleteProfessional,
  };
}

export default useDeleteProfessional;
