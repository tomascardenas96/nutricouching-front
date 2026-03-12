import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import apiClient from "../../auth/api/apiClient";

function useHandleUnassignSpecialty(setSpecialties, onClose) {
  const { user } = useAuth();

  const handleUnassignSpecialty = async (specialtyId) => {
    const unassignSpecialty = async () => {
      const { data } = await apiClient.patch(
        `/specialty/unlink/${specialtyId}/professional/${user.professional.professionalId}`
      );

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
