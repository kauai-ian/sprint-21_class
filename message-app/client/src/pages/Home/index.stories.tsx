import { Meta, StoryObj } from "@storybook/react";

import { Props, Home } from ".";

const meta: Meta<typeof Home> = {
  argTypes: {},
  component: Home,
  title: "Design Systems/pages/Home",
};

export default meta;
type Story = StoryObj<typeof Home>;

const args: Props = {
  handleLogin: () => {},
};

export const Primary: Story = {
  args,
};
