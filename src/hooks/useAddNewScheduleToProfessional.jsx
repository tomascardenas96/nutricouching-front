import { toast } from "sonner";
import { HOST } from "../api/data";
import { useUser } from "../context/UserProvider";

function useAddNewScheduleToProfessional(
  setAvailabilities,
  selectedSchedules,
  setIsAddScheduleModalOpen
) {
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
      loading: "Creando horarios...",
      success: (data) => {
        setAvailabilities((prev) => {
          const newAvailabilities = { ...prev };

          selectedSchedules.forEach((schedule) => {
            const newSchedule = {
              scheduleId: schedule.scheduleId,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              interval: schedule.interval,
            };

            for (const day of schedule.day) {
              newAvailabilities[day] = [
                ...(newAvailabilities[day] || []),
                newSchedule,
              ];
            }
          });

          return sortSchedulesByTime(newAvailabilities);
        });

        setIsAddScheduleModalOpen(false);

        return "Horario añadido exitosamente!";
      },
      error: (err) => err.message,
    });
  };

  // Metodo que ordena los horarios por dia y hora de inicio
  function sortSchedulesByTime(availability) {
    const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const sortedAvailability = {};

    daysOrder.forEach((day) => {
      if (availability[day]) {
        sortedAvailability[day] = [...availability[day]].sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );
      }
    });

    return sortedAvailability;
  }

  return { handleSubmitAddNewSchedule };
}

export default useAddNewScheduleToProfessional;
