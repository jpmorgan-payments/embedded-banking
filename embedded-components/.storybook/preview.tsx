import React, { useEffect, useState } from 'react';
import { addons } from '@storybook/preview-api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { EBComponentsProvider } from '../src/core/EBComponentsProvider';

import 'tailwindcss/tailwind.css';

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? 'dark' : 'light');

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return (
    <EBComponentsProvider
      apiBaseUrl="https://api-mock.payments.jpmorgan.com/tsapi/ef/v2"
      theme={{ colorScheme: colorScheme }}
    >
      <ReactQueryDevtools />
      {children}
    </EBComponentsProvider>
  );
}

export const decorators = [
  (renderStory: any) => (
    <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
  ),
];
