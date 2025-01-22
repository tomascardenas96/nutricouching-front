import { useState } from "react";
import "./NotificationPopUp.css";
import { IoIosNotifications } from "react-icons/io";
import UserBookingsModal from "./UserBookingsModal";

function NotificationPopUp() {
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);

  const handleCloseModal = () => {
    setIsNotificationsModalOpen(false);
  };

  return (
    <>
      <div
        className="notification-pop-up_btn"
        onClick={() => setIsNotificationsModalOpen(!isNotificationsModalOpen)}
      >
        <div>
          <IoIosNotifications className="bell-icon" />
          <div className="red-circle">
            <p>0</p>
          </div>
        </div>
      </div>

      {isNotificationsModalOpen && (
        <UserBookingsModal closeModal={handleCloseModal} />
      )}
    </>
  );
}

export default NotificationPopUp;
