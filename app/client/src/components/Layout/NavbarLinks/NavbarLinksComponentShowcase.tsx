import { useMatch, useResolvedPath } from 'react-router-dom';
import { Button, Text, useMantineTheme } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import useStyles from './NavbarLinks.styles';

const menu = [
  {
    label: 'Getting Started',
    items: [
      {
        label: 'Overview',
      },
      {
        label: 'Installation',
      },
      {
        label: 'Authentication Provider',
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        label: 'Payment Details',
      },
      {
        label: 'Link Account',
      },
    ],
  },
];

function getStartY(el: any) {
  const rect = el?.getBoundingClientRect();
  return rect?.top + window.scrollY-200;
}

function getEndY(startY: any, el: any) {
  const height = el?.offsetHeight;
  return height + startY;
}

const NavbarLink = ({ children, to, title }: any) => {
  const { classes, cx } = useStyles();
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname });
  const childMatch = useMatch({ path: resolved.pathname + '/:child' });
  const [scroll, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();
  const elM = document.getElementById(`${title?.trim()}-panel`);
  const startY = getStartY(elM);
  const endY = getEndY(startY, elM);

  return (
    <Button
      style={{
        width: '100%',
        backgroundColor:
          scroll.y >= startY && scroll.y < endY
            ? theme.colors.gray[1]
            : 'white',
      }}
      className={cx(classes.link, {
        [classes.linkActive]: match || childMatch,
      })}
      onClick={() => scrollTo({ y: startY })}
    >
      {children}
    </Button>
  );
};

export const NavbarLinksComponentShowcase = () => {
  const theme = useMantineTheme();
  return (
    <>
      {menu.map((section, index) => (
        <div key={`navbar${index}`}>
          <Text mb={theme.spacing.sm} mt={theme.spacing.sm} weight={600}>
            {section?.label}
          </Text>
          {section?.items.map((item) => (
            <NavbarLink key={item.label} title={item?.label}>
              <span>{item.label}</span>
            </NavbarLink>
          ))}
        </div>
      ))}
    </>
  );
};
