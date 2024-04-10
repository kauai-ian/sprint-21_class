import {
  useState,
  FC,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { Notification, IUser } from "../types";
import { markRead } from "../api/notifications";
import { getUserNotifications } from "../api/users";
import useCurrentUser from "../hooks/useCurrentUser";
import { mockUser } from "../mocks/users";

export type NotificationContextType = {
  notifications: Notification[] | undefined;
  isLoading: boolean;
  hasUnreadNotifications: boolean;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (_id: string) => void;
  setIsLoading: (loading: boolean) => void;
};

const initState: NotificationContextType = {
  notifications: undefined,
  isLoading: true,
  hasUnreadNotifications: false,
  addNotification: () => {},
  markNotificationRead: () => {},
  setIsLoading: () => {},
};

const getMockNotifications = (currentUser: IUser): Notification[] => [
  {
    _id: "1",
    type: "FOLLOW",
    isRead: false,
    __v: 0,
    createdDate: "2021-07-01T00:00:00.000Z",
    user: currentUser,
    author: mockUser,
  },
];

export const NotificationsContext =
  createContext<NotificationContextType>(initState);

const NotificationsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, token } = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasUnreadNotifications = useMemo(() => {
    return notifications.some((notification) => !notification.isRead);
  }, [notifications]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markNotificationRead = async (id: string) => {
    if (!currentUser?.sub || !token) return;
    const notification = notifications.find(
      (notification) => notification._id === id
    );
    if (!notification) return;
    const isRead = !notification.isRead;
    await markRead(isRead, token);
    setNotifications((notifications) =>
      notifications.map((notification) => ({
        ...notification,
        isRead,
      }))
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchNotifications = async () => {
    if (!currentUser?.sub || !token) return;
    const { data } = await getUserNotifications({
      sub: currentUser.sub,
      token,
    });
    setNotifications(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentUser?.sub || !token) return;

    // TODO -> Swap with fetchNotifications once BE is working
    const mockNotifications = getMockNotifications(currentUser);
    setNotifications(mockNotifications);
    setIsLoading(false);
    // fetchNotifications();
  }, [currentUser, token]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        isLoading,
        addNotification,
        markNotificationRead,
        setIsLoading,
        hasUnreadNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
