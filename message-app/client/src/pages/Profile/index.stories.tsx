import { Meta, StoryObj } from "@storybook/react";

import { Profile, Props } from ".";
import { mockMessage } from "../../mocks/messages";
import { mockUser } from "../../mocks/users";

const meta: Meta<typeof Profile> = {
  argTypes: {},
  component: Profile,
  title: "Design Systems/pages/Profile",
};

export default meta;
type Story = StoryObj<typeof Profile>;

const args: Props = {
  displayName: mockUser.displayName,
  username: mockUser.username,
  bio: "Hello, World!",
  joinedDate: new Date().toISOString(),
  profileImage:
    "https://smartcdn.gprod.postmedia.digital/nationalpost/wp-content/uploads/2016/03/hoff.jpg",
  messages: [mockMessage, mockMessage, mockMessage],
  isProfileOwner: true,
  openEditModal: () => {},
};

export const Primary: Story = {
  args,
};
