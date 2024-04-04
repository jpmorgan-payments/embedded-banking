import { Text, Code, Accordion, Anchor, Image, Flex } from '@mantine/core';
import { Panel } from 'components';
import { Prism } from '@mantine/prism';

const sampleCode = `
import {
  EBComponentsProvider,
} from 'embedded-banking-components';

export const YourIndexFile = () => {
  return (
    <EBComponentsProvider 
      theme={{}}
      sandboxMode
      apiConfig={
        apiUrl: 'https://apigateway.jpmorgan.com/tsapi/ef/v1',
        idpConfig: {
            url: 'YOUR_IDP_URL'
            clientId?: 'YOUR_IDP_CLIENT_ID'
            redirectUri?: 'YOUR_IDP_REDIRECT_URL'
        }
      }
    >
      <App></App>
    </EBComponentsProvider>
  )
}
`;

const optionalParams = `{
    callbackFactory: '',
    middleware: '',
    realmPath: '',
    scope: '',
    serverConfig: '',
    tokenStore: '',
    tree: '',
    type: '',
    oauthThreshold: '',
    logLevel: '',
    logger: '',
    prefix: '',
}`;

export const AuthProviderSection = () => {
  return (
    <Panel title="Authentication Provider" sampleCode={sampleCode}>
      <Text size="md" mb="lg">
        Next, place the
        <Code>{`<EBComponentsProvider>`}</Code>
        component at the top-level of your React application above
        <Code>{`<App>`}</Code>
        . This wrapper will securely handle the sign-in and authenticate the
        user.
      </Text>
      <Text>
        <b>Sandbox</b>
      </Text>
      <Text size="md" mb="lg">
        The <Code>{'sandboxMode'}</Code> parameter will have to be set by your
        application depending on the environment. When running your application
        in development mode, set this value to <Code>{'true'}</Code>. This will
        connect your application to a stateless mock api which will allow you to
        start using the components without creating an account.
      </Text>
      <Text>
        <b>Production</b>
      </Text>
      <Text size="md" mb="lg">
        For production, you will have to create an account and set values for{' '}
        <Code>{'YOUR_IDP_URL'}</Code>
        <Code>{'YOUR_IDP_CLIENT_ID'}</Code>. You can obtain these values by
        requesting them from J.P. Morgan directly.
      </Text>

      <Text size="md" mb="lg">
        The <Code>{'YOUR_IDP_REDIRECT_URL'}</Code> will be your application url.
      </Text>
      <Text size="md" mb="lg">
        When outside of sandbox mode, users of your application will
        automatically get redirected to a login page which will handle the
        authentication of all the components in this library.
      </Text>

      <Flex direction="row" p="lg" justify="center" align="center">
        <Image width="300px" src="/signIn.svg"></Image>
      </Flex>
      <Text size="md" mb="lg">
        Please note, you will have to create each user prior to their using your
        application in production.
      </Text>
      <Accordion>
        <Accordion.Item value="theming">
          <Accordion.Control>
            Optional <Code>{`theme`}</Code> Parameter for{' '}
            <Code>{` <EBComponentsProvider>`}</Code>
          </Accordion.Control>
          <Accordion.Panel>
            <Prism language={'json'}>{`{
    colorScheme: 'dark',
    variables: {
      primaryColor: 'blue'
    }
}`}</Prism>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="apiConfig">
          <Accordion.Control>
            Optional values for <Code>`idpConfig`</Code>
          </Accordion.Control>
          <Accordion.Panel>
            <Text size="sm" mb="sm" mt="sm" pl="sm">
              Please refer to the{' '}
              <Anchor
                target="_blank"
                href="https://backstage.forgerock.com/docs/sdks/latest/sdks/configure-the-sdks.html"
              >
                ForgeRock official docs
              </Anchor>{' '}
              for more information about these optional values{' '}
            </Text>
            <Prism language={'json'}>{optionalParams}</Prism>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Panel>
  );
};
