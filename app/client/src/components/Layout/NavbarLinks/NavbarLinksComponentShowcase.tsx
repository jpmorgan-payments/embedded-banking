import { useMatch, useResolvedPath } from 'react-router-dom';
import { Button, Text, useMantineTheme } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import useStyles from './NavbarLinks.styles';

const menu = [
  {
    label: 'Getting Started',
    items: [
      {
        position: 0,
        label: 'Overview',
        scrollStart: 0,
        scrollEnd: 200,
      },
      {
        position: 200,
        label: 'Installation',
        scrollStart: 200,
        scrollEnd: 300,
      },
      {
        position: 300,
        label: 'Authentication Provider',
        scrollStart: 300,
        scrollEnd: 400,
      },
      {
        position: 400,
        label: 'Configuration',
        scrollStart: 400,
        scrollEnd: 500,
      },
      {
        position: 500,
        label: 'Credentials',
        scrollStart: 500,
        scrollEnd: 600,
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        position: 600,
        label: 'Link Account',
        scrollStart: 600,
        scrollEnd: 700,
      },
    ],
  },
];

const NavbarLink = ({ children, to, scrollStart, scrollEnd }: any) => {
  const { classes, cx } = useStyles();
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname });
  const childMatch = useMatch({ path: resolved.pathname + '/:child' });
  const [scroll, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();

  return (
    <Button
      style={{
        width: '100%',
        backgroundColor:
          scroll.y >= scrollStart && scroll.y < scrollEnd
            ? theme.colors.gray[1]
            : 'white',
      }}
      className={cx(classes.link, {
        [classes.linkActive]: match || childMatch,
      })}
      onClick={() => scrollTo({ y: to })}
    >
      {children}
    </Button>
  );
};

export const NavbarLinksComponentShowcase = () => {
  const theme = useMantineTheme();
  return (
    <>
      {menu.map((section) => (
        <>
          <Text mb={theme.spacing.sm} mt={theme.spacing.sm} weight={600}>
            
            {section?.label}
          </Text>
          {section?.items.map((item) => (
            <NavbarLink
              to={item.position}
              scrollStart={item.scrollStart}
              scrollEnd={item.scrollEnd}
              key={item.label}
            >
              <span>{item.label}</span>
            </NavbarLink>
          ))}
        </>
      ))}
    </>
  );
};
