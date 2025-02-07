import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "../api/data";
import { useUser } from "../context/UserProvider";

function useGetNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();

  // Obtenemos las notificaciones del usuario activo
  useEffect(() => {
    if (user) {
      const getNotifications = async () => {
        const response = await fetch(`${HOST}/notification/${user.userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setNotifications(data);
      };

      getNotifications();
    }
  }, [user]);

  // Obtenemos notificaciones en tiempo real
  useEffect(() => {
    if (!user) {
      return;
    }

    const socket = io(`${HOST}`, {
      query: { userId: user.userId },
    });

    socket.on("deletedBookingNotify", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("deletedBookingNotify");
      socket.off("userNotifications");
      socket.disconnect();
    };
  }, [user]);

  return { notifications, setNotifications };
}

export default useGetNotifications;
