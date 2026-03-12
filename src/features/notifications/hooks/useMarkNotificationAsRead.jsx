import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useMarkNotificationAsRead(notifications) {
  const [markAsReadError, setMarkAsReadError] = useState(null);

  useEffect(() => {
    // Filtramos productos que no fueron leido y obtenemos un arreglo con sus id`s
    const notificationsId = notifications
      .filter((notification) => notification.isRead === false)
      .map((notif) => notif.notificationId);

    const markNotificationAsRead = async () => {
      try {
        await apiClient.patch("/notification", notificationsId);
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
