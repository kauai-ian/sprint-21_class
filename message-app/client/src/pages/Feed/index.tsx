import { FC } from "react";
import MessageCard from "../../components/MessageCard";
import MessageForm from "../../components/MessageForm";
import { Box, Flex } from "@chakra-ui/react";
import useMessages from "../../hooks/useMessages";
import { useAuth0 } from "@auth0/auth0-react";

export const Feed: FC = () => {
  const { isAuthenticated } = useAuth0();
  const { messages } = useMessages();

  return (
    <Box>
      {isAuthenticated && (
        <Box mb="16px">
          <MessageForm />
        </Box>
      )}
      <Flex flexDirection="column" gap={2}>
        {!messages?.length
          ? null
          : messages.map((message) => (
              <MessageCard
                key={`${message._id}_${message.createdDate}`}
                body={message.body}
                authorSub={message.author.sub}
                createdDate={message.createdDate}
                profileImage={message.author.profileImage}
                displayName={message.author.displayName}
                username={message.author.username}
                likes={message.likes}
                _id={message._id}
              />
            ))}
      </Flex>
    </Box>
  );
};

export default Feed;
