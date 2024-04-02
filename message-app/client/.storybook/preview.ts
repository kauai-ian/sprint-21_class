import type { Preview } from "@storybook/react";
import { theme } from "@chakra-ui/react"
import { withRouter } from 'storybook-addon-react-router-v6';

const preview: Preview = {
  decorators: [
    withRouter,
  ],
  parameters: {
    chakra: {
      theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
