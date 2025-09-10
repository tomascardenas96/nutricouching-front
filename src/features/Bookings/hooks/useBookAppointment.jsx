import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useBookAppointment(onClose, professionalSchedule) {
  const authToken = localStorage.getItem("authToken");

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

      const response = await fetch(`${HOST}/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(createBooking),
      });

      if (!response.ok) {
        throw new Error("Error al reservar un turno");
      }

      return await response.json();
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
