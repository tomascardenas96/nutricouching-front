import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import apiClient from "../../auth/api/apiClient";

function useDeleteTimeSlot(setAvailabilities, handleCloseDeleteModal) {
  const { user } = useAuth();

  const handleDeleteTimeSlot = async (startTime, day) => {
    const deleteTimeSlot = async () => {
      const { data } = await apiClient.delete(
        `/availability?startTime=${startTime}&professionalId=${user?.professional?.professionalId}&day=${day}`
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
