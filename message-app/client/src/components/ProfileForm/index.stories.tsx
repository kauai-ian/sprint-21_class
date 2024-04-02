import { Meta, StoryObj } from '@storybook/react';

import ProfileForm, { Props } from '.';

const meta: Meta<typeof ProfileForm> = {
  argTypes: {},
  component: ProfileForm,
  title: 'Design Systems/components/ProfileForm',
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

const args: Props = {
  isOpen: true,
  onClose: () => {},
  profileImage: "https://smartcdn.gprod.postmedia.digital/nationalpost/wp-content/uploads/2016/03/hoff.jpg",
  displayName: "David Hasselhoff",
  bio: "Hello, World!",
};

export const Primary: Story = {
  args,
};
