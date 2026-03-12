import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDeleteSpecialty(setSpecialties, handleCloseDeleteModal) {
  const handleDeleteSpecialty = async (specialtyId) => {
    const deleteSpecialtyPromise = async () => {
      const { data } = await apiClient.delete(`/specialty/${specialtyId}`);

      return data;
    };

    toast.promise(deleteSpecialtyPromise(), {
      success: (data) => {
        handleCloseDeleteModal();
        setSpecialties((prev) =>
          prev.filter((specialty) => specialty.specialtyId !== data.id)
        );
        return "Especialidad eliminada!";
      },
      loading: "Eliminando especialidad...",
      error: "Error al eliminar una especialidad",
    });
  };
  return { handleDeleteSpecialty };
}

export default useDeleteSpecialty;
