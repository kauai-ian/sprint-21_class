import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import MessageForm from "../MessageForm";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string;
};

const NewMessageModal: FC<Props> = ({ isOpen, onClose, profileImage }) => {
  const initialRef = useRef(null);

  const handleSubmit = async () => {
    // TODO: Implement the submit logic
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody px={0} py={6}>
          <MessageForm
            profileImage={profileImage}
            onSubmit={handleSubmit}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewMessageModal;
