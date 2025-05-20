import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDeleteSpecialty(setSpecialties) {
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

      const data = await response.json();

      if (!response.ok) throw new Error();

      return data;
    };

    toast.promise(deleteSpecialtyPromise(), {
      success: (data) => {
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
