import { useEffect } from "react";
import useMarkNotificationAsRead from "../../../hooks/useMarkNotificationAsRead";
import NotificationCard from "./NotificationCard";
import "./NotificationsSection.css";

function NotificationsSection({ notifications, setUnreadNotifications }) {
  const { markAsReadError } = useMarkNotificationAsRead(notifications);

  useEffect(() => {
    setUnreadNotifications(0);
  }, []);

  const isToday = (date) => {
    const now = new Date(Date.now());
    now.setHours(-3, 0, 0, 0);

    const verifiedDate = new Date(date);
    verifiedDate.setHours(-3, 0, 0, 0);

    return verifiedDate.toDateString() === now.toDateString();
  };

  return (
    <div className="notifications-section_container">
      <div className="notifications-header_time">
        <h2 className="header-day">Hoy</h2>
        <div className="notifications-list">
          {notifications.map(
            (notification) =>
              isToday(notification.createdAt) && (
                <NotificationCard
                  key={`next-notification_${notification.notificationId}`}
                  notification={notification}
                />
              )
          )}
        </div>
      </div>

      <hr className="divider-line" />

      <div className="notifications-header_time">
        <h2 className="header-day">Anterior</h2>
        <div className="notifications-list">
          {notifications.map(
            (notification) =>
              !isToday(notification.createdAt) && (
                <NotificationCard
                  key={`prev-notification_${notification.notificationId}`}
                  notification={notification}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsSection;
