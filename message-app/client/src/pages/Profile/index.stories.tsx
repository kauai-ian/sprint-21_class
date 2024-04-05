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
  isFollowing: false,
  handleFollow: () => {},
  handleUnfollow: () => {},
  messages: [mockMessage, mockMessage, mockMessage],
  isProfileOwner: true,
  openEditModal: () => {},
  ...mockUser,
};

export const Primary: Story = {
  args,
};
