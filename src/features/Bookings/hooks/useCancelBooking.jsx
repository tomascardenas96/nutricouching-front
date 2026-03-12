import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import apiClient from "../../auth/api/apiClient";

function useCancelBooking(setBookings, onClose) {
  const { user } = useAuth();

  const handleCancelBooking = async (bookingId) => {
    const cancelBooking = async () => {
      const { data } = await apiClient.delete(
        `/booking/delete/${bookingId}/active-user/${user?.userId}`
      );

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

          onClose();

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
