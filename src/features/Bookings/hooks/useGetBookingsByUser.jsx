import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";
import { useAuth } from "../../auth/hooks/useAuth";

function useGetBookingsByUser() {
  const { user } = useAuth();

  const [bookingsOfUser, setBookingsOfUser] = useState();
  const [previousBookings, setPreviousBookings] = useState({});
  const [nextBookings, setNextBookings] = useState({});

  const [bookingsOfUserLoading, setBookingsOfUserLoading] = useState(false);
  const [bookingsOfUserError, setBookingsOfUserError] = useState(null);

  useEffect(() => {
    const getBookingsByUser = async () => {
      setBookingsOfUserLoading(true);
      try {
        const { data } = await apiClient.get("/booking/user");
        setBookingsOfUser(data);
      } catch (error) {
        setBookingsOfUserError(error);
      } finally {
        setBookingsOfUserLoading(false);
      }
    };

    getBookingsByUser();
  }, []);

  //   Con este efecto dividimos los turnos pasados y los presentes / futuros en dos estados independientes.
  useEffect(() => {
    if (bookingsOfUser) {
      const prev = {};
      const next = {};

      // today se calcula una vez fuera del loop
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTime = today.getTime();

      Object.entries(bookingsOfUser).forEach(([date, bookings]) => {
        const [year, month, day] = date.toString().split("-").map(Number);
        const inputDate = new Date(year, month - 1, day);
        inputDate.setHours(0, 0, 0, 0);

        if (inputDate.getTime() >= todayTime) {
          next[date] = bookings;
        } else {
          prev[date] = bookings;
        }
      });

      setPreviousBookings(prev);
      setNextBookings(next);
    }
  }, [bookingsOfUser]);

  return {
    setBookingsOfUser,
    bookingsOfUserLoading,
    bookingsOfUserError,
    previousBookings,
    nextBookings,
  };
}

export default useGetBookingsByUser;
