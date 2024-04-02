import { Meta, StoryObj } from '@storybook/react';

import MessageForm, { Props } from '.';
import { mockUser } from '../../mocks/users';

const meta: Meta<typeof MessageForm> = {
  argTypes: {},
  component: MessageForm,
  title: 'Design Systems/components/MessageForm',
};

export default meta;
type Story = StoryObj<typeof MessageForm>;

const args: Props = {
  onSubmit: () => {},
  profileImage: mockUser.profileImage,
};

export const Primary: Story = {
  args,
};
