import { Meta, StoryObj } from "@storybook/react";

import MessageCard, { Props } from ".";
import { mockUser } from "../../mocks/users";
import { mockMessage } from "../../mocks/messages";

const meta: Meta<typeof MessageCard> = {
  argTypes: {},
  component: MessageCard,
  title: "Design Systems/components/MessageCard",
};

export default meta;
type Story = StoryObj<typeof MessageCard>;

const args: Props = {
  body: "Hello, World!",
  createdDate: new Date().toISOString(),
  profileImage: mockUser.profileImage,
  username: mockUser.username,
  displayName: mockUser.displayName,
  likes: mockMessage.likes,
};

export const Primary: Story = {
  args,
};
