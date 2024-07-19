import React, { useEffect, useState } from 'react';
import { addons } from '@storybook/preview-api';
import { Preview } from '@storybook/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { EBComponentsProvider } from '../src/core/EBComponentsProvider';

import '../src/index.css';

const channel = addons.getChannel();

function ColorSchemeWrapper({
  children,
  baseUrl,
}: {
  children: React.ReactNode;
  baseUrl: string;
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
      theme={{ colorScheme: colorScheme }}
      headers={{
        api_gateway_client_id: 'OBTSTSTCL1',
      }}
    >
      <ReactQueryDevtools />
      {children}
    </EBComponentsProvider>
  );
}

export const decorators = [
  (renderStory: any, { parameters, allArgs, ...props }: any) => {
    // TODO: we can use global Params
    const url = allArgs?.isMockBaseUrl
      ? 'https://api-mock.payments.jpmorgan.com/tsapi'
      : // : '/ef';
        //TODO: this is also needs to be changed if new API is used
        '';

    return (
      <ColorSchemeWrapper baseUrl={url}>{renderStory()}</ColorSchemeWrapper>
    );
  },
];

const preview: Preview = {
  // The default value of the theme arg for all stories
  args: { isMockBaseUrl: true, isMock: true },
};
export default preview;
