import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_HOST, HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useGetNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthUser();

  // Obtenemos las notificaciones del usuario activo
  useEffect(() => {
    if (user) {
      const getNotifications = async () => {
        const response = await fetch(`${HOST}/notification/${user.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
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

    const socket = io(`${WEBSOCKET_HOST}`, {
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
