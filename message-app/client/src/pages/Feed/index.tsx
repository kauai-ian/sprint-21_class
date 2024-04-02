import { FC } from "react";
import { IMessage } from "../../types";
import MessageCard from "../../components/MessageCard";
import MessageForm from "../../components/MessageForm";
import { Box, Flex } from "@chakra-ui/react";
import { mockUser } from "../../mocks/users";

export type Props = {
  messages: IMessage[];
  profileImage: string;
};

export const Feed: FC<Props> = ({ messages, profileImage }) => {
  const handleSubmit = () => {};

  return (
    <Box>
      <Box mb="16px">
        <MessageForm profileImage={profileImage} onSubmit={handleSubmit} />
      </Box>
      <Flex flexDirection="column" gap={2}>
        {!messages.length
          ? null
          : messages.map((message) => (
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
  );
};

const FeedPage = () => {
  // TODO get messages from API
  const messages = [] as IMessage[];
  const profileImage = mockUser.profileImage;

  return <Feed messages={messages} profileImage={profileImage} />;
};
export default FeedPage;
