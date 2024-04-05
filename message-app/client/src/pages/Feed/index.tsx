import { FC } from "react";
import { IMessage } from "../../types";
import MessageCard from "../../components/MessageCard";
import MessageForm from "../../components/MessageForm";
import { Box, Flex } from "@chakra-ui/react";
import { mockUser } from "../../mocks/users";
import useMessages from "../../hooks/useMessages";

export type Props = {
  messages: IMessage[];
  profileImage: string;
  handleSubmit: (body: string) => void;
};

export const Feed: FC<Props> = ({ messages, profileImage, handleSubmit }) => {
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
                profileImage={message.author?.profileImage}
                displayName={message.author?.displayName}
                username={message.author?.username}
                likes={message.likes}
              />
            ))}
      </Flex>
    </Box>
  );
};

const FeedPage = () => {
  const { messages, addMessage } = useMessages();
  const profileImage = mockUser.profileImage;
  const handleSubmit = async (body: string) => {
    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          authorId: "174a2166-3d83-447a-af04-ec1dde093ed3",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const { data } = await response.json();
      console.log("Message sent successfully", data);
      addMessage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Feed
      messages={messages}
      profileImage={profileImage}
      handleSubmit={handleSubmit}
    />
  );
};
export default FeedPage;
