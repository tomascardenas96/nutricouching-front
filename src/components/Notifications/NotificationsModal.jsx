import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import BookingsSection from "./Bookings/BookingsSection";
import NotificationsSection from "./Notifications/NotificationsSection";
import "./NotificationsModal.css";

function NotificationsModal({
  closeModal,
  notifications,
  setUnreadNotifications,
  setNotifications,
  user,
}) {
  const [selectedSection, setSelectedSection] = useState("notifications");

  // Cuando se abre el modal, se marcan todas las notificaciones como leidas
  useEffect(() => {
    setNotifications((prev) =>
      prev.map((notification) => {
        return { ...notification, isRead: true };
      })
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
          <NotificationsSection
            notifications={notifications}
            setUnreadNotifications={setUnreadNotifications}
          />
        )}
        {selectedSection === "bookings" && (
          <BookingsSection closeModal={closeModal} />
        )}
      </section>
    </div>
  );
}

export default NotificationsModal;
