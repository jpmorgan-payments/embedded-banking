import { Text, Title, Box, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export const NotFoundErrorPage = () => {
  return (
    <Box
      ml="xl"
      sx={{
        maxWidth: 640,
      }}
    >
      <Title
        mb="md"
        sx={(theme) => ({
          fontSize: 64,
          fontWeight: 900,
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[4]
              : theme.colors.dark[4],
        })}
      >
        404
      </Title>
      <Text color="dimmed" size="lg">
        Page you are trying to open does not exist. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Button<typeof Link>
        component={Link}
        to="/dashboard"
        mt="xl"
        variant="outline"
      >
        Return to dashboard
      </Button>
    </Box>
  );
};
