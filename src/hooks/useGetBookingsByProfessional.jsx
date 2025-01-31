import { useEffect } from "react";
import { useState } from "react";
import { HOST } from "../api/data";

function useGetBookingsByProfessional(professionalId) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [errorBookings, setErrorBookings] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      setLoadingBookings(true);
      try {
        const response = await fetch(
          `${HOST}/booking/professional?professionalId=${professionalId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

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
