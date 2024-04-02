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
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string;
  displayName: string;
  bio: string;
};

const ProfileForm: FC<Props> = ({ isOpen, onClose, profileImage, displayName, bio }) => {
  const initialRef = useRef(null);
  const [formData, setFormData] = useState({
    profileImage,
    displayName,
    bio,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // TODO: Implement the submit logic
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Profile image</FormLabel>
            <Input
              ref={initialRef}
              value={formData.profileImage}
              name="profileImage"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={formData.displayName}
              name="displayName"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Textarea
              value={formData.bio}
              name="bio"
              onChange={handleChange}
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

export default ProfileForm;
