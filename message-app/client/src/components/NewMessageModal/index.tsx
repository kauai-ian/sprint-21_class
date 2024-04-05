import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import MessageForm from "../MessageForm";
import useMessages from "../../hooks/useMessages";
import useCurrentUser from "../../hooks/useCurrentUser";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NewMessageModal: FC<Props> = ({ isOpen, onClose }) => {
  const { createMessage, isLoading } = useMessages();
  const { currentUser } = useCurrentUser();
  const initialRef = useRef(null);

  const handleSubmit = async (body: string) => {
    createMessage(body, onClose);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody px={0} py={6}>
          <MessageForm isLoading={isLoading} onSubmit={handleSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewMessageModal;
