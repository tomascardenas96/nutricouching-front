import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useMarkNotificationAsRead(notifications) {
  const authToken = localStorage.getItem("authToken");

  const [markAsReadError, setMarkAsReadError] = useState(null);

  useEffect(() => {
    // Filtramos productos que no fueron leido y obtenemos un arreglo con sus id`s
    const notificationsId = notifications
      .filter((notification) => notification.isRead === false)
      .map((notif) => notif.notificationId);

    const markNotificationAsRead = async () => {
      try {
        const response = await fetch(`${HOST}/notification`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(notificationsId),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
      } catch (error) {
        setMarkAsReadError(error);
      }
    };

    // Ejectutar la funcion unicamente si existe alguna notificacion sin leer
    if (notificationsId.length) {
      markNotificationAsRead();
    }
  }, [notifications]);

  return { markAsReadError };
}

export default useMarkNotificationAsRead;
