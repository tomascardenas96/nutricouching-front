import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";
import useActiveProfessional from "../../professional/hooks/useActiveProfessional";

function useDeleteTimeSlot(setAvailabilities, handleCloseDeleteModal) {
  const { professionalId } = useActiveProfessional();

  const handleDeleteTimeSlot = async (startTime, day) => {
    const deleteTimeSlot = async () => {
      const { data } = await apiClient.delete(
        `/availability?startTime=${startTime}&professionalId=${professionalId}&day=${day}`
      );

      return data;
    };

    toast.promise(deleteTimeSlot(), {
      loading: "Eliminando horario...",
      success: (data) => {
        setAvailabilities((prev) => {
          return {
            ...prev,
            [day]:
              prev[day]?.filter((slot) => slot.startTime !== startTime) || [],
          };
        });
        handleCloseDeleteModal();
        return "Horario eliminado con éxito!";
      },
      error: (error) => {
        return "Error al eliminar horario";
      },
    });
  };

  return { handleDeleteTimeSlot };
}

export default useDeleteTimeSlot;
