import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { EBConfig, EBThemeVariables } from './config.types';
import { convertThemeToCssString } from './convert-theme-to-css-variables';

export interface EBComponentsProviderProps extends EBConfig {
  children: ReactNode;
}

export const EBComponentsProvider: React.FC<EBComponentsProviderProps> = ({
  children,
  apiBaseUrl,
  theme = {},
}) => {
  const queryClient = new QueryClient();
  // TODO: set up api instance

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('eb-light', 'eb-dark');

    if (
      theme.colorScheme === 'dark' ||
      (theme.colorScheme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      root.classList.add('eb-dark');
    } else {
      root.classList.add('eb-light');
    }
  }, [theme.colorScheme]);

  const css = useMemo(() => convertThemeToCssString(theme), [theme]);

  return (
    <>
      <style
        data-eb-styles
        dangerouslySetInnerHTML={{
          __html: css,
        }}
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
