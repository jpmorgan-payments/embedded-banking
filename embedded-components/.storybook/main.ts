import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    'msw-storybook-addon',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
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
      },
    });
  },
};

export default config;
