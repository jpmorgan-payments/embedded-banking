import { Title } from '@mantine/core';
import { Panel } from 'components';
import { useForgeRockUser } from './ForgeRockContext';
import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export const ForgeRockCallback = () => {
  let [searchParams] = useSearchParams();
  const { tokens, authorize } = useForgeRockUser();

  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    async function authenticateUserWithCallback() {
      if (code && state) {
        await authorize(code, state);
      }
    }
    authenticateUserWithCallback();
  }, [authorize, code, state]);

  if (tokens) {
    return (
      <Panel>
        <Title mb="md">Authentication</Title>
        Logging you in...
      </Panel>
    );
  }

  return tokens ? (
    <Navigate to="/loggedIn" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
