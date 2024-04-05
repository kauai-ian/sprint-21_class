import {
  FormControl,
  Button,
  Textarea,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useMessages from "../../hooks/useMessages";
import * as api from "../../api/messages";

const MessageForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useCurrentUser();
  const { addMessage } = useMessages();
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    try {
      if (!body || !currentUser) {
        return;
      }
      setLoading(true);
      const { data } = await api.createMessage(body, currentUser._id);
      if (!data) {
        throw new Error("Failed to create message");
      }
      addMessage(data);
      setBody("");
    } catch (error) {
      console.error("Failed to create message", error);
    }
    setLoading(false);
  };

  return (
    <Flex w="full" px="16px">
      <Box pt="20px" mr="8px" flexGrow="0" flexBasis="40px" borderRadius="50%">
        <Image
          borderRadius="50%"
          h="40px"
          w="full"
          src={
            currentUser?.profileImage ||
            "https://avatars.githubusercontent.com/u/20189952"
          }
          alt="Profile image"
        />
      </Box>
      <Box pt="4px" flex="1">
        <FormControl w="full" py="12px" color="rgb(231, 233, 234)">
          <Textarea
            outline="none"
            placeholder="What's on your mind?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </FormControl>
        <Flex justify="flex-end">
          <Button isLoading={loading} onClick={handleSubmit}>
            Post
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MessageForm;
