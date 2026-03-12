import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useSSEEvent } from "../../../services/useSSEEvent";
import apiClient from "../../auth/api/apiClient";

function useGetNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.isEmailConfirmed) return;

    const getNotifications = async () => {
      try {
        const { data } = await apiClient.get("/notification");
        setNotifications(data);
      } catch {
        // silently ignore
      }
    };

    getNotifications();
  }, [user]);

  useSSEEvent("deletedBookingNotify", (data) => {
    setNotifications((prev) => [data, ...prev]);
  });

  useSSEEvent("reservedShift", (data) => {
    setNotifications((prev) => [data, ...prev]);
  });

  return { notifications, setNotifications };
}

export default useGetNotifications;
