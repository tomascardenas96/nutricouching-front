import { toast } from "sonner";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useDeleteTimeSlot(setAvailabilities) {
  const { user } = useAuthUser();
  const authToken = localStorage.getItem("authToken");

  const handleDeleteTimeSlot = async (startTime, day) => {
    const deleteTimeSlot = async () => {
      const response = await fetch(
        `${HOST}/availability?startTime=${startTime}&professionalId=${user?.professional?.professionalId}&day=${day}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

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
        return "Horario eliminado con éxito!";
      },
      error: "Error al eliminar horario!",
    });
  };

  return { handleDeleteTimeSlot };
}

export default useDeleteTimeSlot;
