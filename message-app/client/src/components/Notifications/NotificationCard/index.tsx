import { FC } from "react";
import { Text, Image, Flex, Button, Link } from "@chakra-ui/react";
import { Notification } from "../../../types";

export type Props = {
  notification: Notification;
  markNotificationRead: (id: string) => void;
};

const NotificationCard: FC<Props> = ({
  notification,
  markNotificationRead,
}) => {
  const NOTIFICATION_TYPE_TO_MESSAGE = {
    LIKE: "liked your message",
    FOLLOW: "followed you",
    NEW_MESSAGE: "posted a new message",
  };

  const message = NOTIFICATION_TYPE_TO_MESSAGE[notification.type];

  return (
    <Flex gap={4}>
      <Flex gap={2} align="center">
        <Image
          src={notification.author.profileImage}
          w={8}
          h={8}
          borderRadius="full"
        />
        <Text>
          <Link href={`/profile/${notification.author.sub}`}>
            {notification.author.displayName || notification.author.username}
          </Link>{" "}
          {message}
        </Text>
      </Flex>
      <Button
        variant="link"
        onClick={() => markNotificationRead(notification._id)}
      >
        {notification.isRead ? "Read" : "Unread"}
      </Button>
    </Flex>
  );
};

export default NotificationCard;
