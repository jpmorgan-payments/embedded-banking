export type EBColorScheme = 'dark' | 'light' | 'system';

export type EBThemeVariables = {
  backgroundColor?: string;
  foregroundColor?: string;
  primaryColor?: string;
  primaryColorHover?: string;
  primaryForegroundColor?: string;
  secondaryColor?: string;
  secondaryForegroundColor?: string;
  destructiveColor?: string;
  destructiveForegroundColor?: string;
  mutedColor?: string;
  mutedForegroundColor?: string;
  accentColor?: string;
  accentForegroundColor?: string;
  cardColor?: string;
  cardForegroundColor?: string;
  popoverColor?: string;
  popoverForegroundColor?: string;
  borderRadius?: string;
  borderColor?: string;
  inputColor?: string;
  ringColor?: string;
  zIndexOverlay?: number;
};

export type EBTheme = {
  colorScheme?: EBColorScheme;
  variables?: EBThemeVariables;
  light?: EBThemeVariables;
  dark?: EBThemeVariables;
};

export type EBConfig = {
  apiBaseUrl: string;
  theme?: EBTheme;
};
