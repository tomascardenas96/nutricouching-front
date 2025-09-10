import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDeleteSpecialty(setSpecialties, handleCloseDeleteModal) {
  const authToken = localStorage.getItem("authToken");

  const handleDeleteSpecialty = async (specialtyId) => {
    const deleteSpecialtyPromise = async () => {
      const response = await fetch(`${HOST}/specialty/${specialtyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error();

      return await response.json();
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
