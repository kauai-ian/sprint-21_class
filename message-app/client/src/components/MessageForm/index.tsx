import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Textarea,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { FC, useState } from "react";

export type Props = {
  onSubmit: (body: string) => void;
  profileImage: string;
};

const MessageForm: FC<Props> = ({ onSubmit, profileImage }) => {
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    // TODO: Implement the submit logic
    onSubmit(body);
  };

  return (
    <Flex w="full" px="16px">
      <Box pt="20px" mr="8px" flexGrow="0" flexBasis="40px" borderRadius="50%">
        <Image
          borderRadius="50%"
          h="40px"
          w="full"
          src={profileImage}
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
          <Button onClick={handleSubmit}>
            Post
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MessageForm;
