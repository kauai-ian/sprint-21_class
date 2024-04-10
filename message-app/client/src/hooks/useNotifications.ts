import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

const useNotifications = () => {
  const {
    notifications,
    isLoading,
    markNotificationRead,
    hasUnreadNotifications,
  } = useContext(NotificationsContext);

  return {
    notifications,
    markNotificationRead,
    isLoading,
    hasUnreadNotifications,
  };
};

export default useNotifications;
