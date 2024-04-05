import { Meta, StoryObj } from '@storybook/react';

import ProfileForm, { Props } from '.';
import { mockUser } from '../../mocks/users';

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
  ...mockUser,
  isLoading: false,
  onSubmit: () => {},
};

export const Primary: Story = {
  args,
};
