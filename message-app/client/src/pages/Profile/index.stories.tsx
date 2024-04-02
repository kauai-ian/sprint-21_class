import { Meta, StoryObj } from "@storybook/react";

import { Profile, Props } from ".";
import { mockMessage } from "../../mocks/messages";

const meta: Meta<typeof Profile> = {
  argTypes: {},
  component: Profile,
  title: "Design Systems/pages/Profile",
};

export default meta;
type Story = StoryObj<typeof Profile>;

const args: Props = {
  displayName: "John Doe",
  username: "johndoe",
  bio: "Hello, World!",
  joinedDate: new Date().toISOString(),
  profileImage:
    "https://smartcdn.gprod.postmedia.digital/nationalpost/wp-content/uploads/2016/03/hoff.jpg",
  messages: [mockMessage],
};

export const Primary: Story = {
  args,
};
