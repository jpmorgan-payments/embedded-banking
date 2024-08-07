import { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '../src/index.css';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};
export default preview;
