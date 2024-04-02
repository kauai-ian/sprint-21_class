import { Meta, StoryObj } from "@storybook/react";

import { Feed, Props } from ".";
import { mockMessage } from "../../mocks/messages";

const meta: Meta<typeof Feed> = {
  argTypes: {},
  component: Feed,
  title: "Design Systems/pages/Feed",
};

export default meta;
type Story = StoryObj<typeof Feed>;

const args: Props = {
  messages: [mockMessage],
};

export const Primary: Story = {
  args,
};
