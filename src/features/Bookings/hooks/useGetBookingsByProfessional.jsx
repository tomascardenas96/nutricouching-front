import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import apiClient from "../../auth/api/apiClient";

function useGetBookingsByProfessional() {
  const { user } = useAuth();
  const professionalId = user?.professional?.professionalId;

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);

  useEffect(() => {
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
  }, []);

  return { bookings, setBookings, loadingBookings, errorBookings };
}

export default useGetBookingsByProfessional;
