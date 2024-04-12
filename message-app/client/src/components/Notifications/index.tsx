import { FiBell } from "react-icons/fi";
import useNotifications from "../../hooks/useNotifications";
import {
  Icon,
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
import NotificationCard from "./NotificationCard";

const Notifications = () => {
  const { notifications, hasUnreadNotifications, markNotificationRead } =
    useNotifications();

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
            {hasUnreadNotifications && (
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
            {notifications ? (
              notifications?.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  markNotificationRead={markNotificationRead}
                />
              ))
            ) : (
              <Text>No notifications</Text>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Notifications;