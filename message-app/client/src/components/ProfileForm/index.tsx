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
import { IUser } from "../../types";

export type FormData = {
  profileImage: string;
  displayName: string;
  bio: string;
  headerImage?: string;
};

export type Props = IUser & {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

const ProfileForm: FC<Props> = ({
  isOpen,
  onClose,
  isLoading,
  onSubmit,
  ...user
}) => {
  const initialRef = useRef(null);
  const [formData, setFormData] = useState({
    profileImage: user.profileImage,
    headerImage: user.headerImage,
    displayName: user.displayName,
    bio: user.bio,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.profileImage || !formData.displayName || !formData.bio) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Header image</FormLabel>
            <Input
              ref={initialRef}
              value={formData.headerImage}
              name="headerImage"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Profile image</FormLabel>
            <Input
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
            <FormLabel>Bio</FormLabel>
            <Textarea value={formData.bio} name="bio" onChange={handleChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileForm;
