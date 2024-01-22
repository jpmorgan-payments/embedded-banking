import { Button, Space, Title } from '@mantine/core';
import { Navigate } from 'react-router-dom';
import { IconExternalLink } from '@tabler/icons';

import { Panel } from 'components';
import { useForgeRockUser } from './ForgeRockContext';

export const Login = () => {
  const { tokens, redirectToLogin, isRedirecting } = useForgeRockUser();

  return tokens ? (
    <Navigate to="/loggedIn" replace />
  ) : (
    <Panel>
      <Title mb="md">Authentication</Title>
      You need to log in to view this page.
      <Space h="xs" />
      <Button
        leftIcon={<IconExternalLink size={16} />}
        onClick={redirectToLogin}
        loading={isRedirecting}
      >
        Log in with ForgeRock
      </Button>
    </Panel>
  );
};
