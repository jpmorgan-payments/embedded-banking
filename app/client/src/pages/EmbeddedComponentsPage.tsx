import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Grid,
  Group,
  JsonInput,
  List,
  Text,
} from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';

import { PageWrapper, Panel } from 'components';
import { GITHUB_REPO } from 'data/constants';
import {
  LinkedAccountWidget,
  EBComponentsProvider,
} from 'embedded-banking-components';

export const EmbeddedComponentsPage = () => {
  const defaultTheme = {
    primaryColor: 'jpmc',
    defaultRadius: 4,
    colors: {
      jpmc: [
        '#dff6ff',
        '#bbdef5',
        '#95c6e8',
        '#6dafde',
        '#4698d3',
        '#2c7fb9',
        '#1e6291',
        '#134669',
        '#042a42',
        '#000f1c',
      ],
    },
  };
  const [theme, setTheme] = useState(JSON.stringify(defaultTheme, null, 2));
  const [savedTheme, setSavedTheme] = useState(
    JSON.stringify(defaultTheme, null, 2),
  );
  const saveTheme = () => {
    setSavedTheme(theme);
  };
  const resetTheme = () => {
    setTheme(JSON.stringify(defaultTheme, null, 2));
    setSavedTheme(JSON.stringify(defaultTheme, null, 2));
  };

  const parseTheme = () => {
    try {
      return JSON.parse(savedTheme);
    } catch {
      return defaultTheme;
    }
  };

  return (
    <PageWrapper title="Embedded Components">
      <Text size="xl">
        Seamlessly integrate sophisticated UI components into your existing
        applications with Embedded Components, offering a plug-and-play solution
        for Embedded Banking features.
      </Text>
      <Panel
        title="Getting started"
        sampleCode={`
import {
  EBComponentsProvider,
  LinkAccountForm
} from 'embedded-banking-components';

export const YourReactApplication = () => {
  return (
    <EBComponentsProvider 
      apiConfig={{/* Your API configuration */}}
      theme={{}}
    >
      {/* Other components */}
      <LinkAccountForm />
      {/* The rest of your application */}
    </EBComponentsProvider>
  )
}
`}
      >
        <Text size="lg" mb="sm">
          Integrating Embedded Components just takes a few simple steps.
        </Text>
        <List type="ordered">
          <List.Item>
            <b>Initialize with EBComponentsProvider</b>: Begin by importing{' '}
            <Code>EBComponentsProvider</Code> and use it to wrap your
            application.
          </List.Item>
          <List.Item>
            <b>Configuration</b>: Configure <Code>EBComponentsProvider</Code> by
            providing your Embedded Banking API URL. Additionally, you'll need
            to supply your client's token.
          </List.Item>
          <List.Item>
            <b>Embed Components</b>: After setting up the provider, you can
            start embedding the components within your application. These
            components are designed to integrate smoothly with your existing UI.
          </List.Item>
          <List.Item>
            <b>Customize to Your Brand</b>: If desired, you can customize the
            look of the components to match your application's design. This is
            done by providing a <Code>theme</Code> object to{' '}
            <Code>EBComponentsProvider</Code>.
          </List.Item>
        </List>
      </Panel>
      <Panel
        title="Linked Account"
        customBadge={
          <Badge variant="filled" color="jpmc" radius="xs">
            Component
          </Badge>
        }
      >
        <Grid>
          <Grid.Col xs={12} lg="auto">
            <Text mb="md">
              With this component, your client will be able to see the status of
              their linked account. If they do not have a linked account yet,
              they will be able to link an account via this component.
            </Text>
            <Card maw={300}>
              <EBComponentsProvider
                apiBaseUrl=""
                theme={
                  {
                    // colorScheme: 'dark',
                    // variables: { primaryColor: 'hsl(0 50% 75%)' },
                  }
                }
              >
                <LinkedAccountWidget />
              </EBComponentsProvider>
            </Card>
          </Grid.Col>
          <Grid.Col xs={12} lg="content">
            <Box miw={450}>
              <JsonInput
                label="Try customizing the theme"
                validationError="Invalid JSON"
                formatOnBlur
                minRows={20}
                value={theme}
                onChange={setTheme}
              />
              <Group mt="sm">
                <Button size="xs" onClick={saveTheme}>
                  Save theme
                </Button>
                <Button size="xs" onClick={resetTheme} variant="default">
                  Reset theme
                </Button>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
      </Panel>
      <Panel
        title="Pay Out"
        customBadge={
          <Badge variant="filled" color="jpmc" radius="xs">
            Component
          </Badge>
        }
      >
        <Text mb="md">
          This component allows your client to make payments to recipients that
          they have added via Embedded Banking.
        </Text>
        <Card maw={300} shadow="lg" radius={0} withBorder>
          {/* <PayOutForm /> */}
        </Card>
      </Panel>
      <Panel
        title="Payment Details"
        customBadge={
          <Badge variant="filled" color="jpmc" radius="xs">
            Component
          </Badge>
        }
      >
        <Text mb="md">
          This component allows your client to view details of a payment made
          through Embedded Banking.
        </Text>
        <Card maw={300} shadow="lg" radius={0} withBorder>
          {/* <PaymentDetails /> */}
        </Card>
      </Panel>
      <Panel
        title="Onboarding"
        customBadge={
          <Badge variant="filled" color="jpmc" radius="xs">
            Component
          </Badge>
        }
      >
        <Text size="lg">Under construction</Text>
      </Panel>
    </PageWrapper>
  );
};
