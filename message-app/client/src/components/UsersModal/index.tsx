import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FC } from "react";
import { IUser } from "../../types";
import UserCard from "../UserCard";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: IUser[];
};

const UsersModal: FC<Props> = ({ isOpen, onClose, users }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody py={6}>
          {users.map((user) => (
            <UserCard key={user.sub} {...user} />
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UsersModal;
