import { ReactNode, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AXIOS_INSTANCE } from '@/api/axios-instance';

import { EBConfig } from './config.types';
import { convertThemeToCssString } from './convert-theme-to-css-variables';

export interface EBComponentsProviderProps extends EBConfig {
  children: ReactNode;
}

export const EBComponentsProvider: React.FC<EBComponentsProviderProps> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apiBaseUrl,
  theme = {},
}) => {
  const queryClient = new QueryClient();
  // TODO: set up api instance

  AXIOS_INSTANCE.interceptors.request.use((config) => {
    return {
      ...config,
      baseURL: apiBaseUrl,
    };
  });

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
