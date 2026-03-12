import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useBookAppointment(onClose, professionalSchedule) {
  const handleSubmitBookAppointment = async (
    e,
    date,
    time,
    professionalId,
    specialtyId
  ) => {
    e.preventDefault();

    const bookAppointment = async () => {
      if (!date || !time || !professionalId || !specialtyId) {
        throw new Error("Debe completar todos los campos");
      }

      const filteredDate = professionalSchedule.find(
        (d) => d.startTime === time
      );

      const createBooking = {
        specialtyId,
        date: date.toISOString().split("T")[0],
        startTime: time,
        endTime: filteredDate.endTime,
        interval: filteredDate.interval,
        professionalId,
      };

      const { data } = await apiClient.post("/booking/create", createBooking);
      return data;
    };

    toast.promise(bookAppointment(), {
      loading: "Procesando turno...",
      success: (data) => {
        setTimeout(() => {
          onClose(false);
        }, 1000);

        return "Turno reservado exitosamente!";
      },
      error: (error) => error.message,
    });
  };

  return { handleSubmitBookAppointment };
}

export default useBookAppointment;
