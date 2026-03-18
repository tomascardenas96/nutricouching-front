import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";
import useActiveProfessional from "../../professional/hooks/useActiveProfessional";

function useGetBookingsByProfessional() {
  const { professionalId } = useActiveProfessional();

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);

  useEffect(() => {
    if (!professionalId) return;

    const getBookings = async () => {
      setLoadingBookings(true);
      try {
        const { data } = await apiClient.get(
          `/booking/professional?professionalId=${professionalId}`
        );
        setBookings(data);
      } catch (error) {
        setErrorBookings(error.message);
      } finally {
        setLoadingBookings(false);
      }
    };

    getBookings();
  }, [professionalId]);

  return { bookings, setBookings, loadingBookings, errorBookings };
}

export default useGetBookingsByProfessional;
