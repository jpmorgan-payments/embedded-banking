import { forwardRef } from 'react';
import {
  Anchor,
  Badge,
  Button,
  Group,
  Stack,
  StackProps,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons';

interface PageWrapperProps extends StackProps {
  width?: number | string;
  title?: string;
  apiEndpoint?: string;
  githubLink?: string;
}

export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  (
    { children, width, title, apiEndpoint, githubLink, style, ...props },
    ref,
  ) => {
    const theme = useMantineTheme();
    return (
      <Stack
        sx={{ minHeight: '100%', maxWidth: theme.breakpoints.xl }}
        ref={ref}
        {...props}
      >
        <Group align="end">
          <Title>{title}</Title>
          {apiEndpoint ? (
            <Badge
              variant="gradient"
              gradient={{ from: 'indigo', to: 'violet' }}
              size="lg"
              mb={4}
            >
              {apiEndpoint}
            </Badge>
          ) : null}
          {githubLink ? (
            <Button
              component="a"
              leftIcon={<IconBrandGithub size={16} />}
              size="sm"
              variant="default"
              href={githubLink}
              target="_blank"
              radius="xl"
            >
              View on GitHub
            </Button>
          ) : null}
        </Group>
        {children}
      </Stack>
    );
  },
);
