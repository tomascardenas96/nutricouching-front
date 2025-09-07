import { toast } from "sonner";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useDeleteTimeSlot(setAvailabilities, handleCloseDeleteModal) {
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

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
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
