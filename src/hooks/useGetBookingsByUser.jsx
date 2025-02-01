import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { HOST } from "../api/data";

function useGetBookingsByUser() {
  const [bookingsOfUser, setBookingsOfUser] = useState();
  const [previousBookings, setPreviousBookings] = useState({});
  const [nextBookings, setNextBookings] = useState({});

  const [bookingsOfUserLoading, setBookingsOfUserLoading] = useState(false);
  const [bookingsOfUserError, setBookingsOfUserError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const getBookingsByUser = async () => {
      setBookingsOfUserLoading(true);
      try {
        const response = await fetch(
          `${HOST}/booking/user?userId=${user?.userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setBookingsOfUser(data);
      } catch (error) {
        console.error(error);
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

      Object.entries(bookingsOfUser).forEach(([date, bookings]) => {
        //Convertimos la fecha de hoy y la fecha del turno para comparar si el turno ya paso o esta pendiente.
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [year, month, day] = date.toString().split("-").map(Number);
        const inputDate = new Date(year, month - 1, day); // Mes en JS es base 0
        inputDate.setHours(0, 0, 0, 0);

        if (inputDate.getTime() >= today.getTime()) {
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
