import {
  Box,
  Spinner,
  Button,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import MessageCard from "../../components/MessageCard";
import { IMessage } from "../../types";
import { FC } from "react";
import dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

export type Props = {
  displayName: string;
  username: string;
  bio: string;
  joinedDate: string;
  profileImage: string;
  messages: IMessage[];
};

export const Profile: FC<Props> = ({
  displayName,
  username,
  bio,
  joinedDate,
  profileImage,
  messages,
}) => {
  const { user } = useAuth0();
  // console.log("USER ", user);
  const date = dayjs(joinedDate).format("MMMM YYYY");
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
          {/* TODO Swap for "EDIT" */}
          <Button mt="5px">Follow</Button>
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
              body={message.body}
              createdDate={message.createdDate}
              profileImage={message.author.profileImage}
              displayName={message.author.displayName}
              username={message.author.username}
              likes={message.likes}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const ProfilePage = () => {
  // TODO get user data from API
  // const { sub } = useParams()
  const { currentUser, isLoadingUser } = useCurrentUser();
  console.log("CURRENT USER IN PROFILE ", currentUser);
  if (isLoadingUser || !currentUser) {
    return <Spinner />;
  }

  return (
    <Profile
      displayName={currentUser.displayName}
      username={currentUser.username}
      bio="Hello, World!"
      joinedDate={currentUser.joinedDate}
      profileImage={currentUser.profileImage}
      messages={[]}
    />
  );
};

export default ProfilePage;
