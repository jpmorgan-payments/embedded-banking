import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', 'storybook-dark-mode'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    return mergeConfig(config, {
      build: {
        sourcemap: 'inline',
      },
      server: {
        fs: {
          allow: ['../'],
        },
        proxy: {
          '/ef': {
            target: 'https://t3mpo-api-gateway-service-dev.jpmchase.net',
            // TODO: this is for api-extermal-0.9...
            // target: 'https://api-mock-payments.dev.aws.jpmchase.net',
            changeOrigin: true,
            secure: false,
            rewrite: (path: string) => {
              console.log(
                '@@PATH',
                path,
                '>>',
                // path.replace(/^\/ef/, '/api-gateway/api/ef/v2')
                path.replace(/^\/ef\/do\/v1/, '/api-gateway/api/ef/v2')
              );

              // path.replace(/^\/ef/, '/api-gateway/api/ef/v2');
              path.replace(/^\/ef\/do\/v1/, '/api-gateway/api/ef/v2');
            },
            // TODO: this is for api-extermal-0.9...
            // rewrite: (path) => {
            //   return '/tsapi' + path;
            // },
            configure: (proxy, opt) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('@@ERR');
              });
              proxy.on('proxyReq', (err, _req, _res) => {
                console.log('@@REQ1');
              });
              proxy.on('proxyRes', (err, _req, _res) => {
                console.log('@@RES1');
              });
            },
          },
        },
      },
    });
  },
};

export default config;
