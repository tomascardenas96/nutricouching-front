import { useEffect } from "react";
import useGetNotifications from "../../../hooks/useGetNotifications";
import useMarkNotificationAsRead from "../../../hooks/useMarkNotificationAsRead";
import NotificationCard from "./NotificationCard";
import "./NotificationsSection.css";

function NotificationsSection({ notifications, setUnreadNotifications }) {
  const {} = useMarkNotificationAsRead(notifications);

  useEffect(() => {
    setUnreadNotifications(0);
  }, []);

  return (
    <div className="notifications-section_container">
      <div className="notifications-header_time">
        <h2 className="header-day">Hoy</h2>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <NotificationCard
              key={`notification_${notification.notificationId}`}
              notification={notification}
            />
          ))}
        </div>
      </div>

      <hr className="divider-line" />

      <div className="notifications-header_time">
        <h2 className="header-day">Anterior</h2>
        <div className="notifications-list">
          {notifications.map((notification) => (
            <>
              <NotificationCard
                key={`notification_${notification.notificationId}1`}
                notification={notification}
              />
              <NotificationCard
                key={`notification_${notification.notificationId}2`}
                notification={notification}
              />
              <NotificationCard
                key={`notification_${notification.notificationId}3`}
                notification={notification}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationsSection;
