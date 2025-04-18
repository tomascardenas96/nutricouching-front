import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { io } from "socket.io-client";
import { WEBSOCKET_HOST } from "../../api/data";
import useGetNotifications from "../../hooks/useGetNotifications";
import "./NotificationPopUp.css";
import NotificationsModal from "./NotificationsModal";

function NotificationPopUp({
  isNotificationsModalOpen,
  setIsNotificationsModalOpen,
  user,
}) {
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const { notifications, setNotifications } = useGetNotifications();

  const handleCloseModal = () => {
    setIsNotificationsModalOpen(false);
  };

  // Alerta notificaciones no leidas
  useEffect(() => {
    if (notifications.length === 0) return;

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

  // Actualizar notificaciones en tiempo real
  useEffect(() => {
    if (!user || notifications.length === 0) return;

    const socket = io(`${WEBSOCKET_HOST}`, {
      query: { userId: user.userId },
    });

    socket.on("afterPurchaseNotify", (data) => {
      if (data.service === "plan_download") {
        switch (data.status) {
          case "approved":
            setNotifications((prev) => [data, ...prev]);
            break;

          case "rejected":
            toast.error(data.message);
            break;
        }
      }
    });

    return () => {
      socket.off("afterPurchaseNotify");
      socket.disconnect();
    };
  }, [user, notifications]);

  return (
    <>
      <div
        className="notification-pop-up_btn"
        onClick={() => setIsNotificationsModalOpen(!isNotificationsModalOpen)}
      >
        <div>
          <h2 className="notifications-title">NOTIFICACIONES</h2>
          <IoIosNotifications className="bell-icon" />
          {true && (
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
          user={user}
        />
      )}
    </>
  );
}

export default NotificationPopUp;
