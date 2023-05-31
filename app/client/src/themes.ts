import type { MantineThemeOverride } from '@mantine/core';

export const themes: Record<string, MantineThemeOverride> = {
  'Default Light': {
    colorScheme: 'light',
    primaryColor: 'jpmc',
    colors: {
      jpmc: [
        '#dff6ff',
        '#bbdef5',
        '#95c6e8',
        '#6dafde',
        '#4698d3',
        '#2c7fb9',
        '#1e6291',
        '#134669',
        '#042a42',
        '#000f1c',
      ],
    },
  },
  'Default Dark': {
    colorScheme: 'dark',
  },
};
