import { ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AXIOS_INSTANCE } from '@/api/axios-instance';

import { EBConfig } from './config.types';
import { convertThemeToCssString } from './convert-theme-to-css-variables';

export interface EBComponentsProviderProps extends EBConfig {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const EBComponentsProvider: React.FC<EBComponentsProviderProps> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apiBaseUrl,
  headers = {},
  theme = {},
}) => {
  const [interceptor, setInterceptor] = useState<number | undefined>();

  useEffect(() => {
    AXIOS_INSTANCE.interceptors.request.use(
      (config: any) => {
        if (config.url.includes('/file')) {
          config.responseType = 'blob';
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    if (interceptor) {
      AXIOS_INSTANCE.interceptors.request.eject(interceptor);
    }
    const ebInterceptor = AXIOS_INSTANCE.interceptors.request.use(
      (config: any) => {
        return {
          ...config,
          headers: {
            ...config.headers,
            ...headers,
          },
          baseURL: apiBaseUrl,
        };
      }
    );

    setInterceptor(ebInterceptor);
  }, [JSON.stringify(headers), apiBaseUrl]);

  useEffect(() => {
    const resetQueries = async () => {
      await queryClient.resetQueries();
    };
    resetQueries();
  }, [interceptor]);

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
