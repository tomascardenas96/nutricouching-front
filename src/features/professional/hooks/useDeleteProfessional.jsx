import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDeleteProfessional(
  setProfessionals,
  selectedProfessional,
  handleCloseDeleteModal
) {
  const handleDeleteProfessional = () => {
    const deleteProfessional = async () => {
      const { data } = await apiClient.delete(
        `/professional/delete/${selectedProfessional.professionalId}`
      );
      return data;
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
