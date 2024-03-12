import { createContext, ReactNode, useContext, useEffect } from 'react';
import { EBConfig, EBTheme, EBThemeVariables } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface EBComponentsProviderProps extends EBConfig {
  children: ReactNode;
}

const variableKeyMap: Record<keyof EBThemeVariables, string> = {
  colorPrimary: 'primary',
};

const defaultTheme: EBTheme = {
  colorScheme: 'system',
  variables: {},
};

export const EBComponentsProvider: React.FC<EBComponentsProviderProps> = ({
  children,
  apiBaseUrl,
  theme = defaultTheme,
}) => {
  const queryClient = new QueryClient();
  // TODO: set up api instance

  useEffect(() => {
    Object.entries(theme.variables ?? {}).forEach(([key, value]) => {
      const variableKey: keyof EBThemeVariables = key as keyof EBThemeVariables;
      window.document.documentElement.style.setProperty(
        `--${variableKeyMap[variableKey]}`,
        value
      );
    });
  }, [theme.variables]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('eb-dark');

    if (
      theme.colorScheme === 'dark' ||
      (theme.colorScheme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
      window.document.documentElement.classList.add('eb-dark');
    else document.documentElement.classList.remove('eb-dark');
  }, [theme.colorScheme]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
