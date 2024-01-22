import { useEffect, useState } from 'react';
import type { OAuth2Tokens } from '@forgerock/javascript-sdk';
import { Accordion, Button, Code, Space, Title } from '@mantine/core';

import { Panel } from 'components';
import { useForgeRockUser } from './ForgeRockContext';
import jwtDecode from 'jwt-decode';

export const SecureContent = () => {
  const { logout, user, tokens } = useForgeRockUser();
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <Panel>
      <Title mb="md">Authentication</Title>
      {user ? (
        <>
          <div>
            Welcome, {user?.given_name} {user?.family_name}
          </div>
          <div>
            Your email is <b>{user?.email}</b>
          </div>
          <Space h="xs"></Space>
          <Accordion multiple>
            <Accordion.Item value="accessToken">
              <Accordion.Control>Access Token</Accordion.Control>
              <Accordion.Panel>
                <Code color="blue" style={{ wordWrap: 'break-word' }}>
                  {tokens?.accessToken}
                </Code>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="idToken">
              <Accordion.Control>ID Token</Accordion.Control>
              <Accordion.Panel>
                <Code color="blue" style={{ wordWrap: 'break-word' }}>
                  {tokens?.idToken}
                </Code>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="idTokenDecoded">
              <Accordion.Control>ID Token (Decoded)</Accordion.Control>
              <Accordion.Panel>
                <pre>
                  {JSON.stringify(
                    tokens?.idToken && jwtDecode(tokens.idToken),
                    null,
                    4,
                  )}
                </pre>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </>
      ) : (
        'Fetching user data...'
      )}

      <Space h="xs" />
      <Button
        color="red"
        loading={loggingOut}
        onClick={async () => {
          setLoggingOut(true);
          await logout();
        }}
      >
        Log out
      </Button>
    </Panel>
  );
};
