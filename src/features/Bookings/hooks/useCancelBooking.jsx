import { toast } from "sonner";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useCancelBooking(setBookings) {
  const { user } = useAuthUser();
  const authToken = localStorage.getItem("authToken");

  const handleCancelBooking = async (bookingId) => {
    const cancelBooking = async () => {
      const response = await fetch(
        `${HOST}/booking/delete/${bookingId}/active-user/${user?.userId}`,
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

    toast.promise(cancelBooking(), {
      success: (data) => {
        setBookings((prev) => {
          const updatedBookings = {};

          Object.keys(prev).forEach((date) => {
            // Filtramos las reservas de cada fecha
            const filteredBookings = prev[date].filter(
              (booking) => booking.bookingId !== data.id
            );

            // Solo agregamos la fecha si aún tiene reservas después de filtrar
            if (filteredBookings.length > 0) {
              updatedBookings[date] = filteredBookings;
            }
          });

          return updatedBookings;
        });
        return "Turno cancelado con exito";
      },
      loading: "Cancelando turno",
      error: "Error al cancelar el turno",
    });
  };

  return { handleCancelBooking };
}

export default useCancelBooking;
