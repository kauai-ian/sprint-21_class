import { FiBell } from "react-icons/fi";
import useNotifications from "../../hooks/useNotifications";
import {
  useDisclosure,
  Icon,
  Button,
  Box,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { IUser, Notification } from "../../types";

const Notifications = () => {
  const { isOpen, onOpen } = useDisclosure();
  const { notifications, hasUnreadNotification, markNotificationRead } =
    useNotifications();

  const getNotificationCopy = (user: IUser, type: Notification["type"]) => {
    switch (type) {
      case "LIKE":
        return `${user.displayName} liked your message`;
      case "FOLLOW":
        return `${user.displayName} followed you`;
      case "NEW_MESSAGE":
        return `${user.displayName} posted a new message`;
      default:
        return "";
    }
  };

  return (
    <Box>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Box
            as="button"
            _hover={{
              outline: "none",
              borderColor: "transparent",
            }}
            _focus={{
              outline: "none",
              borderColor: "transparent",
            }}
            position="relative"
          >
            <Icon as={FiBell} />
            {hasUnreadNotification && (
              <Box
                position="absolute"
                top={0}
                right={0}
                w={2}
                h={2}
                bg="red.500"
                rounded="full"
              />
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Notifications</PopoverHeader>
          <PopoverBody>
            {notifications?.map((notification) => {
              const message = getNotificationCopy(
                notification.author,
                notification.type
              );
              return (
                <Box key={notification._id}>
                  <Text>{message}</Text>
                  <Button
                    onClick={() => markNotificationRead(notification._id)}
                  >
                    Mark as Read
                  </Button>
                </Box>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Notifications;
