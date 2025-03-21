import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import useGetNotifications from "../../hooks/useGetNotifications";
import "./NotificationPopUp.css";
import NotificationsModal from "./NotificationsModal";

function NotificationPopUp({
  isNotificationsModalOpen,
  setIsNotificationsModalOpen,
}) {
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const { notifications, setNotifications } = useGetNotifications();

  const handleCloseModal = () => {
    setIsNotificationsModalOpen(false);
  };

  useEffect(() => {
    const filterUnread = notifications.filter(
      (notification) => !notification.isRead
    );

    if (filterUnread) {
      const quantity = filterUnread.reduce((acc, curr) => {
        return (acc += 1);
      }, 0);

      setUnreadNotifications(quantity);
    }
  }, [notifications]);

  return (
    <>
      <div
        className="notification-pop-up_btn"
        onClick={() => setIsNotificationsModalOpen(!isNotificationsModalOpen)}
      >
        <div>
          <h2 className="notifications-title">NOTIFICACIONES</h2>
          <IoIosNotifications className="bell-icon" />
          {unreadNotifications !== 0 && (
            <div className="red-circle">
              <p>{unreadNotifications}</p>
            </div>
          )}
        </div>
      </div>

      {isNotificationsModalOpen && (
        <NotificationsModal
          closeModal={handleCloseModal}
          notifications={notifications}
          setUnreadNotifications={setUnreadNotifications}
          setNotifications={setNotifications}
        />
      )}
    </>
  );
}

export default NotificationPopUp;
