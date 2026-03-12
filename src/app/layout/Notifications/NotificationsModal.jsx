import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import BookingsSection from "./Bookings/BookingsSection";
import NotificationsSection from "./Notifications/NotificationsSection";
import "./NotificationsModal.css";
import OrdersNotifications from "./Orders/OrdersNotifications";

function NotificationsModal({ closeModal, notifications, setNotifications }) {
  const [selectedSection, setSelectedSection] = useState("notifications");
  const { user } = useAuth();

  // Cuando se abre el modal, se marcan todas las notificaciones como leidas
  useEffect(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  }, []);

  return (
    <div className="user-notifications-modal_container" onClick={closeModal}>
      <section
        className="user-notifications-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="select-section">
          <div>
            <p
              onClick={() => setSelectedSection("notifications")}
              className={
                selectedSection === "notifications"
                  ? "selected-section_notifications-modal"
                  : ""
              }
            >
              Notificaciones
            </p>

            {user?.professional?.role === "root" && (
              <p
                onClick={() => setSelectedSection("orders")}
                className={
                  selectedSection === "orders"
                    ? "selected-section_notifications-modal"
                    : ""
                }
              >
                Pedidos
              </p>
            )}

            {user?.professional?.role !== "root" && (
              <p
                onClick={() => setSelectedSection("bookings")}
                className={
                  selectedSection === "bookings"
                    ? "selected-section_notifications-modal"
                    : ""
                }
              >
                Turnos
              </p>
            )}
          </div>

          <IoMdClose className="close-icon" onClick={closeModal} />
        </div>

        {selectedSection === "notifications" && (
          <NotificationsSection notifications={notifications} />
        )}
        {selectedSection === "bookings" && (
          <BookingsSection closeModal={closeModal} />
          // <p>Turnos</p>
        )}
        {selectedSection === "orders" && <OrdersNotifications />}
      </section>
    </div>
  );
}

export default NotificationsModal;
