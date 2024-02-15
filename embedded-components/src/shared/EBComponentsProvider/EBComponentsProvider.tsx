import { createContext, useContext, ReactNode } from 'react';
import {
  MantineThemeOverride,
  createTheme,
  DEFAULT_THEME,
  MantineTheme,
  mergeMantineTheme,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface EBComponentsProviderProps {
  children: ReactNode;
  apiConfig?: { apiKey: string };
  theme: MantineThemeOverride;
}

const EBThemeContext = createContext<MantineTheme | null>(null);

export const EBComponentsProvider: React.FC<EBComponentsProviderProps> = ({
  children,
  apiConfig,
  theme,
}) => {
  const queryClient = new QueryClient();
  // TODO: set up api instance

  const customTheme = mergeMantineTheme(DEFAULT_THEME, theme);

  return (
    <QueryClientProvider client={queryClient}>
      <EBThemeContext.Provider value={customTheme}>{children}</EBThemeContext.Provider>
    </QueryClientProvider>
  );
};

export const useEBTheme = () => useContext(EBThemeContext);
