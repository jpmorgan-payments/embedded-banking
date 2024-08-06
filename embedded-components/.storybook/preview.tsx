import React, { useEffect, useState } from 'react';
import { addons } from '@storybook/preview-api';
import { Preview } from '@storybook/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { EBComponentsProvider } from '../src/core/EBComponentsProvider';

import '../src/index.css';

const channel = addons.getChannel();

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
});

function ColorSchemeWrapper({
  children,
  baseUrl,
  api_gateway_client_id,
}: {
  children: React.ReactNode;
  baseUrl: string;
  api_gateway_client_id: string;
}) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return (
    <EBComponentsProvider
      apiBaseUrl={baseUrl}
      theme={{
        colorScheme: colorScheme,
      }}
      headers={{
        api_gateway_client_id,
      }}
    >
      <ReactQueryDevtools />
      {children}
    </EBComponentsProvider>
  );
}

export const decorators = [
  (renderStory: any, { parameters, allArgs, ...props }: any) => {
    return (
      <ColorSchemeWrapper baseUrl={allArgs.apiBaseUrl} {...allArgs}>
        {renderStory()}
      </ColorSchemeWrapper>
    );
  },
];

const preview: Preview = {
  // The default value of the theme arg for all stories
  args: {
    isMockBaseUrl: true,
    isMock: true,
    apiBaseUrl: '',
    api_gateway_client_id: '',
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};
export default preview;
