import { useCallback, useMemo } from "react";
import { IoIosNotifications } from "react-icons/io";
import { toast } from "sonner";
import useGetNotifications from "../../../features/notifications/hooks/useGetNotifications";
import { useSSEEvent } from "../../../services/useSSEEvent";
import "./NotificationPopUp.css";
import NotificationsModal from "./NotificationsModal";

function NotificationPopUp({ isNotificationsModalOpen, setIsNotificationsModalOpen }) {
  const { notifications, setNotifications } = useGetNotifications();

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const handleCloseModal = useCallback(() => {
    setIsNotificationsModalOpen(false);
  }, [setIsNotificationsModalOpen]);

  useSSEEvent("afterPurchaseNotify", (data) => {
    if (data.service === "plan_download" || data.service === "resource_download") {
      if (data.status === "approved") {
        setNotifications((prev) => [data, ...prev]);
      } else if (data.status === "rejected") {
        toast.error(data.message);
      }
    }
  });

  return (
    <>
      <div
        className="notification-pop-up_btn"
        onClick={() => setIsNotificationsModalOpen(!isNotificationsModalOpen)}
      >
        <div>
          <h2 className="notifications-title">NOTIFICACIONES</h2>
          <IoIosNotifications className="bell-icon" />
          {unreadNotifications > 0 && (
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
          setNotifications={setNotifications}
        />
      )}
    </>
  );
}

export default NotificationPopUp;
