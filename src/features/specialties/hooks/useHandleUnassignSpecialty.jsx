import { toast } from "sonner";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useHandleUnassignSpecialty(setSpecialties, onClose) {
  const { user } = useAuthUser();
  const token = localStorage.getItem("authToken");

  const handleUnassignSpecialty = async (specialtyId) => {
    const unassignSpecialty = async () => {
      const response = await fetch(
        `${HOST}/specialty/unlink/${specialtyId}/professional/${user.professional.professionalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      return data;
    };

    toast.promise(unassignSpecialty(), {
      loading: "Eliminando especialidad...",
      success: (data) => {
        setSpecialties((prev) =>
          prev.filter((sp) => sp.specialtyId !== data.id)
        );
        onClose();
        return "Especialidad eliminada exitosamente!";
      },
      error: (error) => {
        console.log(error);
        return "Error al eliminar una especialidad";
      },
    });
  };
  return { handleUnassignSpecialty };
}

export default useHandleUnassignSpecialty;
