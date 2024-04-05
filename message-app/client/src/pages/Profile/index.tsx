import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import MessageCard from "../../components/MessageCard";
import { IMessage, IUser } from "../../types";
import { FC, useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import * as api from "../../api/users";
import useMessages from "../../hooks/useMessages";
import ProfileForm, { FormData } from "../../components/ProfileForm";
import Loading from "../../components/Loading";

export type Props = {
  displayName: string;
  username: string;
  bio: string;
  joinedDate: string;
  profileImage: string;
  messages: IMessage[];
  isProfileOwner: boolean;
  openEditModal: () => void;
};

export const Profile: FC<Props> = ({
  displayName,
  username,
  bio,
  joinedDate,
  profileImage,
  messages,
  isProfileOwner,
  openEditModal,
}) => {
  const date = dayjs(joinedDate).format("MMMM YYYY");

  const handleClick = () => {
    if (isProfileOwner) {
      return openEditModal();
    }
    console.log("FOLLOW USER");
  };

  return (
    <Box maxW="600px" m="auto">
      <Image
        src={
          "https://dustinstout.com/wp-content/uploads/2016/04/twitter-header-template.jpg"
        }
      />
      <Box pt="7px" px="11px" mb="16px">
        <Flex justify="space-between" align="flex-start">
          <Box w="25%" mb="12px" mt="-15%" position="relative">
            <Box w="full" pb="100%" />
            <Box position="absolute" top="0">
              <Image borderRadius="full" boxSize="150px" src={profileImage} />
            </Box>
          </Box>
          <Button mt="5px" onClick={handleClick}>
            {isProfileOwner ? "Edit" : "Follow"}
          </Button>
        </Flex>
        <Box>
          <Text fontSize="2xl" fontWeight="extrabold">
            {displayName}
          </Text>
          <Text fontSize="md">@{username}</Text>
        </Box>
        <Box mt="10px">
          <Text>{bio}</Text>
        </Box>
        <Box mt="10px">
          <Text>Joined: {date}</Text>
        </Box>
      </Box>
      <Box flexDirection="column">
        <Text fontSize="large" fontWeight="bold" mb="16px">
          Messages
        </Text>
        <Flex flexDir="column" flex="1" gap={2}>
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              _id={message._id}
              body={message.body}
              createdDate={message.createdDate}
              profileImage={message.author.profileImage}
              displayName={message.author.displayName}
              username={message.author.username}
              likes={message.likes}
              authorSub={message.author.sub}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const ProfilePage = () => {
  const { sub } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addUser, currentUser, updateCurrentUser, users, token } =
    useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { messages } = useMessages();

  // Check if we have already fetched the user
  const [user, setUser] = useState<IUser | undefined>(() => {
    if (currentUser && currentUser.sub === sub) {
      return currentUser;
    }
    return users.find((user) => user.sub === sub);
  });

  const isProfileOwner = currentUser?.sub === sub;

  const currentUserMessages = useMemo(() => {
    if (!user || !messages) {
      return [];
    }

    return messages.filter((message) => message.author.sub === sub);
  }, [user, messages, sub]);

  // Fetch the user if we haven't already
  const fetchUser = async () => {
    if (user || !sub || !token) {
      return;
    }

    try {
      const { data } = await api.getUser(sub, token);

      if (!data) {
        throw new Error("Failed to get user");
      }
      setUser(data);
      // Add this newly fetched user to the list of users we've already fetched
      addUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const updateUser = async (formData: FormData) => {
    try {
      if (!user || !formData || !token) {
        return;
      }

      setIsLoading(true);
      const { data } = await api.updateUser(
        user.sub,
        { ...user, ...formData },
        token
      );
      if (!data) {
        throw new Error("Failed to update profile");
      }
      updateCurrentUser(data);
      setUser({ ...user, ...formData });
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.error("Failed to update profile", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!sub || (user && user.sub === sub) || !token) {
      return;
    }
    fetchUser();
  }, [sub, user, token]);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <ProfileForm
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        onSubmit={updateUser}
        {...user}
      />
      <Profile
        {...user}
        openEditModal={onOpen}
        messages={currentUserMessages}
        isProfileOwner={isProfileOwner}
      />
    </>
  );
};

export default ProfilePage;
