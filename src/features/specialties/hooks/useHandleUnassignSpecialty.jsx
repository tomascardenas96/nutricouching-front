import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";
import useActiveProfessional from "../../professional/hooks/useActiveProfessional";

function useHandleUnassignSpecialty(setSpecialties, onClose) {
  const { professionalId } = useActiveProfessional();

  const handleUnassignSpecialty = async (specialtyId) => {
    const unassignSpecialty = async () => {
      const { data } = await apiClient.patch(
        `/specialty/unlink/${specialtyId}/professional/${professionalId}`
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
      error: () => "Error al eliminar una especialidad",
    });
  };
  return { handleUnassignSpecialty };
}

export default useHandleUnassignSpecialty;
