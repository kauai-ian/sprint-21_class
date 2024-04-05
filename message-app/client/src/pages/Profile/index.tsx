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
import UsersModal from "../../components/UsersModal";

export type Props = IUser & {
  messages: IMessage[];
  isProfileOwner: boolean;
  openEditModal: () => void;
  isFollowing: boolean;
  handleFollow: () => void;
  handleUnfollow: () => void;
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
  followers,
  following,
  isFollowing,
  handleFollow,
  handleUnfollow,
}) => {
  const date = dayjs(joinedDate).format("MMMM YYYY");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: followersOpen,
    onOpen: openFollowers,
    onClose: closeFollowers,
  } = useDisclosure();

  const handleClick = () => {
    if (isProfileOwner) {
      return openEditModal();
    }
    if (isFollowing) {
      return handleUnfollow();
    }
    handleFollow();
  };

  return (
    <>
      <UsersModal
        isOpen={followersOpen}
        onClose={closeFollowers}
        users={followers}
      />
      <UsersModal isOpen={isOpen} onClose={onClose} users={following} />
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
              {isProfileOwner ? "Edit" : isFollowing ? "Unfollow" : "Follow"}
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
        <Box>
          <Flex>
            <Text as="button" onClick={openFollowers}>
              {followers.length}{" "}
              {followers.length === 1 ? "Follower" : "Followers"}
            </Text>
            {following.length ? (
              <Text as="button" onClick={onOpen}>
                {following.length} Following
              </Text>
            ) : null}
          </Flex>
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
    </>
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
  const isFollowing = !!user?.followers.some((u) => u.sub === currentUser?.sub);

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

  const handleFollow = async () => {
    if (!user || !token || !currentUser) {
      return;
    }

    try {
      setIsLoading(true);

      setUser({ ...user, followers: [...user.followers, currentUser] });
      updateCurrentUser({
        ...currentUser,
        following: [...currentUser.following, user],
      });
      const { data } = await api.followUser(user.sub, currentUser._id, token);
      if (!data) {
        throw new Error("Failed to follow user");
      }
      // TODO handle updating the user and current user's followers correctly
      console.log("DATA", data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to follow user", error);
    }
    setIsLoading(false);
  };

  const handleUnfollow = async () => {
    if (!user || !token || !currentUser) {
      return;
    }
    try {
      setIsLoading(true);
      setUser({
        ...user,
        followers: user.followers.filter((u) => u.sub !== currentUser.sub),
      });
      updateCurrentUser({
        ...currentUser,
        following: currentUser.following.filter((u) => u.sub !== user.sub),
      });
      const { data } = await api.unfollowUser(user.sub, currentUser._id, token);
      if (!data) {
        throw new Error("Failed to unfollow user");
      }
      // TODO handle updating the user and current user's followers correctly
      console.log("DATA", data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to unfollow user", error);
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
        isFollowing={isFollowing}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
      />
    </>
  );
};

export default ProfilePage;
