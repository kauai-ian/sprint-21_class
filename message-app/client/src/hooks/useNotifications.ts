import { useContext } from "react";
import { NotificationsContext } from "../context/NotificationsContext";

const useNotifications = () => {
  const { notifications, isLoading, markNotificationRead } =
    useContext(NotificationsContext);

  return { notifications, markNotificationRead, isLoading };
};

export default useNotifications;
