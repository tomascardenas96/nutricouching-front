import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useBookAppointment(
  onClose,
  date,
  time,
  userId,
  professionalId,
  specialtyId,
  professionalSchedule,
  setEndTime
) {
  const authToken = localStorage.getItem("authToken");

  const handleSubmitBookAppointment = async (e) => {
    e.preventDefault();

    const bookAppointment = async () => {
      if (
        date &&
        time &&
        serviceId &&
        userId &&
        professionalId &&
        specialtyId
      ) {
        const filteredDate = professionalSchedule.find(
          (d) => d.startTime === time
        );

        const createBooking = {
          specialtyId,
          date,
          startTime: time,
          endTime: filteredDate.endTime,
          interval: filteredDate.interval,
          professionalId,
        };

        try {
          const response = await fetch(`${HOST}/booking/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(createBooking),
          });

          const data = await response.json();

          if (data.error) {
            console.error(data);
            throw new Error(data.message || "Error en el servidor");
          }

          return data;
        } catch (error) {
          console.error("Error al reservar un turno: ", error);
        }
      } else {
        throw new Error("Debes completar todos los datos");
      }
    };

    toast.promise(bookAppointment(), {
      loading: "Procesando turno...",
      success: (data) => {
        setTimeout(() => {
          onClose(false);
        }, 1000);

        return "Turno reservado exitosamente!";
      },
      error: "Error al intentar reservar un turno",
    });
  };

  return { handleSubmitBookAppointment };
}

export default useBookAppointment;
