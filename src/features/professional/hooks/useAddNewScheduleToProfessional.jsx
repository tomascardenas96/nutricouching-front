import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";
import useActiveProfessional from "./useActiveProfessional";

function useAddNewScheduleToProfessional(
  setAvailabilities,
  selectedSchedules,
  onClose
) {
  const { professionalId } = useActiveProfessional();

  const handleSubmitAddNewSchedule = async (e, schedule) => {
    e.preventDefault();

    const addNewSchedule = async () => {
      if (!schedule.length) {
        throw new Error("Debe seleccionar al menos un horario");
      }

      const { data } = await apiClient.post(
        `/availability/${professionalId}`,
        schedule
      );

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

        onClose();

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
