import { Meta, StoryObj } from '@storybook/react';

import MessageForm, { Props } from '.';

const meta: Meta<typeof MessageForm> = {
  argTypes: {},
  component: MessageForm,
  title: 'Design Systems/components/MessageForm',
};

export default meta;
type Story = StoryObj<typeof MessageForm>;

const args: Props = {
  isOpen: true,
  onClose: () => {},
};

export const Primary: Story = {
  args,
};
