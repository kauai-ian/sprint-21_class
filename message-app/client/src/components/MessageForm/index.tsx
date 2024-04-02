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
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MessageForm: FC<Props> = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    // TODO: Implement the submit logic
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your message</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Say something..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageForm;
