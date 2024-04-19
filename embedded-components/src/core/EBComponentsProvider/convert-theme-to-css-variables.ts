import merge from 'deepmerge';

import { EBTheme, EBThemeVariables } from './config.types';
import { defaultTheme } from './defaultTheme';

export type CSSVariable = `--${string}`;

export type CSSVariables = Record<CSSVariable, string | undefined>;

const convertThemeVariablesToCssVariables = (
  variables: EBThemeVariables
): CSSVariables => {
  const cssVariablesObject: CSSVariables = {
    '--eb-background': variables.backgroundColor,
    '--eb-foreground': variables.foregroundColor,
    '--eb-card': variables.cardColor,
    '--eb-card-foreground': variables.cardForegroundColor,
    '--eb-popover': variables.popoverColor,
    '--eb-popover-foreground': variables.popoverForegroundColor,
    '--eb-primary': variables.primaryColor,
    '--eb-primary-foreground': variables.primaryForegroundColor,
    '--eb-secondary': variables.secondaryColor,
    '--eb-secondary-foreground': variables.secondaryForegroundColor,
    '--eb-muted': variables.mutedColor,
    '--eb-muted-foreground': variables.mutedForegroundColor,
    '--eb-accent': variables.accentColor,
    '--eb-accent-foreground': variables.accentForegroundColor,
    '--eb-destructive': variables.destructiveColor,
    '--eb-destructive-foreground': variables.destructiveForegroundColor,
    '--eb-radius': variables.borderRadius,
    '--eb-border': variables.borderColor,
    '--eb-input': variables.inputColor,
    '--eb-ring': variables.ringColor,
    '--eb-z-overlay': variables.zIndexOverlay
      ? String(variables.zIndexOverlay)
      : undefined,
  };

  const cssVariables = (variables: Record<string, string | number | undefined>): CSSVariables => {
    type CSSVariables = Record<CSSVariable, string>;
    const cssVars: CSSVariables = {};

    Object.keys(variables).forEach((key) => {
      const cssVariablesKey: CSSVariable = `--eb-${key.replace(/[A-Z]/g, (match) => `-${match.toLocaleLowerCase()}`)}`
      if (variables[key]) {
        cssVars[cssVariablesKey] = '' + variables[key];
      }
    })
    return cssVars;
  }



  // Object.keys(cssVariablesObject).forEach(
  //   (key) =>
  //     cssVariablesObject[key as CSSVariable] === undefined &&
  //     delete cssVariablesObject[key as CSSVariable]
  // );
  // check this:
  console.log('@@css', cssVariables(variables));

  return cssVariables(variables);
};

const cssVariablesObjectToString = (variables: CSSVariables) =>
  Object.entries(variables)
    .map(([name, value]) => `${name}: ${value};`)
    .join('');

export const convertThemeToCssString = (theme: EBTheme) => {
  const cssVariables = {
    variables: convertThemeVariablesToCssVariables(
      merge(defaultTheme.variables ?? {}, theme.variables ?? {})
    ),
    light: convertThemeVariablesToCssVariables(
      merge.all([
        defaultTheme.light ?? {},
        theme.variables ?? {},
        theme.light ?? {},
      ])
    ),
    dark: convertThemeVariablesToCssVariables(
      merge.all([
        defaultTheme.dark ?? {},
        theme.variables ?? {},
        theme.dark ?? {},
      ])
    ),
  };

  const shared = `:root{${cssVariablesObjectToString(cssVariables.variables)}}`;
  const light = `.eb-light{${cssVariablesObjectToString(cssVariables.light)}}`;
  const dark = `.eb-dark{${cssVariablesObjectToString(cssVariables.dark)}}`;

  return `${shared}${light}${dark}`;
};
