import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useBookAppointment(setIsRequestReservationOpen) {
  const token = localStorage.getItem("authToken");

  const handleSubmitBookAppointment = async (
    e,
    date,
    time,
    serviceId,
    userId,
    professionalId
  ) => {
    e.preventDefault();

    const bookAppointment = async () => {
      if (date && time && serviceId && userId && professionalId) {
        const createBooking = { date, time, serviceId, userId, professionalId };
        try {
          const response = await fetch(`${HOST}/booking/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(createBooking),
          });

          if (!response.ok) {
            throw new Error(data.message || "Error en el servidor");
          }

          const data = await response.json();

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
          setIsRequestReservationOpen(false);
        }, 1000);

        return "Turno reservado exitosamente!";
      },
      error: "Error al intentar reservar un turno",
    });
  };

  return { handleSubmitBookAppointment };
}

export default useBookAppointment;
