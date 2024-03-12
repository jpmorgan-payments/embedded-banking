export type EBColorScheme = 'dark' | 'light' | 'system';

export type EBThemeVariables = {
  colorPrimary?: string;
};

export type EBTheme = {
  colorScheme?: EBColorScheme;
  variables?: EBThemeVariables;
};

export type EBConfig = {
  apiBaseUrl: string;
  theme?: EBTheme;
};
