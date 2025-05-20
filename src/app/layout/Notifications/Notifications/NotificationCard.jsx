import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "./NotificationCard.css";

function NotificationCard({ notification }) {
  const [isRead, setIsRead] = useState(notification.isRead);

  // Borramos el fondo gris de la notificacion luego de 7 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRead(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date) => {
    const notificationDate = new Date(date);
    const day = notificationDate.getDate();
    const month = notificationDate.getMonth() + 1;
    const year = notificationDate.getFullYear();

    const hour = notificationDate.getHours();
    const minutes = notificationDate.getMinutes();

    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year} - ${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}hs`;
  };

  return (
    <div
      className={`notification-card_container ${
        !isRead ? "visible-notification_deleted-booking" : ""
      }`}
    >
      <div className="notification-delete-icon">
        <AiOutlineDelete />
      </div>

      <div className="notification-body">
        <p className="notification-description">{notification.message}</p>
        <p className="notification-time">
          {formatDate(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default NotificationCard;
