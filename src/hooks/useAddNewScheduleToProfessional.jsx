import { toast } from "sonner";
import { HOST } from "../api/data";
import { useUser } from "../context/UserProvider";

function useAddNewScheduleToProfessional() {
  const { user } = useUser();
  const authToken = localStorage.getItem("authToken");

  const handleSubmitAddNewSchedule = async (e, schedule) => {
    e.preventDefault();

    const addNewSchedule = async () => {
      if (!!!schedule.length) {
        throw new Error("Debe seleccionar al menos un horario");
      }

      const response = await fetch(
        `${HOST}/availability/${user?.professional?.professionalId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(schedule),
        }
      );

      const data = await response.json();

      if (data.statusCode === 400) {
        throw new Error("El horario no puede ser repetido");
      }

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(addNewSchedule(), {
      loading: "Adicionando novo horário...",
      success: (data) => {
        // Cerrar modal
        return "Horário adicionado com sucesso!";
      },
      error: (err) => err.message,
    });
  };

  return { handleSubmitAddNewSchedule };
}

export default useAddNewScheduleToProfessional;
