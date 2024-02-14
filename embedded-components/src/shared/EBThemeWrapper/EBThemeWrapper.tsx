import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { useEBTheme } from '@/shared/EBComponentsProvider';

interface EBThemeWrapperProps {
  children: ReactNode;
}

export const EBThemeWrapper: React.FC<EBThemeWrapperProps> = ({ children }) => {
  const theme = useEBTheme();

  if (!theme) {
    throw new Error('EB Components must be used within EBComponentsWrapper');
  }

  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
