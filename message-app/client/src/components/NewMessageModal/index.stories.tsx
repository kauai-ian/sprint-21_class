import { Meta, StoryObj } from '@storybook/react';

import NewMessageModal, { Props } from '.';
import { mockUser } from '../../mocks/users';

const meta: Meta<typeof NewMessageModal> = {
  argTypes: {},
  component: NewMessageModal,
  title: 'Design Systems/components/NewMessageModal',
};

export default meta;
type Story = StoryObj<typeof NewMessageModal>;

const args: Props = {
  isOpen: true,
  onClose: () => {},
  profileImage: mockUser.profileImage,
};

export const Primary: Story = {
  args,
};
