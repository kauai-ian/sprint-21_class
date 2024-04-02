import { Meta, StoryObj } from '@storybook/react';

import Layout from '.';

const meta: Meta<typeof Layout> = {
  argTypes: {},
  component: Layout,
  title: 'Design Systems/components/Layout',
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Primary: Story = {
  render: () => (
    <Layout>
      <div>Children</div>
    </Layout>
  )
};
