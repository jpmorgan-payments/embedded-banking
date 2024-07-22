import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  RemoveScroll,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { NavbarLinks } from './NavbarLinks/NavbarLinks';
import {
  ThemeSelectMenu,
  ThemeSelectMenuProps,
} from './ThemeSelectMenu/ThemeSelectMenu';
import UnicornAssistant from 'unicorn-assitant/UnicornAssitant';

interface LayoutProps {
  themeProps: ThemeSelectMenuProps;
}

export const Layout = ({
  children,
  themeProps,
}: React.PropsWithChildren<LayoutProps>) => {
  const theme = useMantineTheme();

  const location = useLocation();
  const [opened, setOpened] = useState(false);

  // Close navbar on mobile view if route changes
  useEffect(() => {
    setOpened(false);
  }, [location]);

  const lessThanSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <NavbarLinks />
        </Navbar>
      }
      header={
        <Header
          height={70}
          p="md"
          className={RemoveScroll.classNames.zeroRight}
        >
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text
              weight={700}
              color={
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[4]
                  : theme.colors.dark[4]
              }
            >
              {lessThanSm ? 'EB Showcase' : 'Embedded Banking Showcase'}
            </Text>

            <ThemeSelectMenu {...themeProps} />
          </Group>
        </Header>
      }
    >
      {children}
      <UnicornAssistant />
    </AppShell>
  );
};
