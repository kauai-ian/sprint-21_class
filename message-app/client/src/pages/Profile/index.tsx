import { Box, Flex, Image, Text } from "@chakra-ui/react";
import MessageCard from "../../components/MessageCard";
import { mockUser } from "../../mocks/users";
import { mockMessage } from "../../mocks/messages";
import { IMessage } from "../../types";
import { FC } from "react";

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
  return (
    <Box>
      <Box>
        <Image src={profileImage} />
      </Box>
      <Box flexDirection="column">
        <Text>Messages</Text>
        <Flex flexDir="column" flex="1">
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

  return (
    <Profile
      displayName={mockUser.displayName}
      username={mockUser.username}
      bio="Hello, World!"
      joinedDate={new Date().toISOString()}
      profileImage={mockUser.profileImage}
      messages={[mockMessage]}
    />
  );
};

export default ProfilePage;
