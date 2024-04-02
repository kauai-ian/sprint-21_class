import { Meta, StoryObj } from "@storybook/react";

import { Feed, Props } from ".";
import { mockMessage } from "../../mocks/messages";
import { mockUser } from "../../mocks/users";

const meta: Meta<typeof Feed> = {
  argTypes: {},
  component: Feed,
  title: "Design Systems/pages/Feed",
};

export default meta;
type Story = StoryObj<typeof Feed>;

const args: Props = {
  messages: [mockMessage, mockMessage, mockMessage, mockMessage],
  profileImage: mockUser.profileImage,
};

export const Primary: Story = {
  args,
};
