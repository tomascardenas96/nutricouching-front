import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "./NotificationCard.css";

function NotificationCard({ notification }) {
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    // Ocultar la notificación después de 3 segundos.
    const timer = setTimeout(() => {
      setIsRead(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

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
        <p className="notification-time">20/01/2025 - 21:49hs</p>
      </div>
    </div>
  );
}

export default NotificationCard;
