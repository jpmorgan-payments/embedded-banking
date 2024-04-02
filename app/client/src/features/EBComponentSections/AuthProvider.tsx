import { Text, Code } from '@mantine/core';
import { Panel } from 'components';

const code1 = `
<EBComponentsProvider>
`;
const code2 = `
<App>
`;
const sampleCode = `
import {
  EBComponentsProvider,
} from 'embedded-banking-components';

export const YourIndexFile = () => {
  return (
    <EBComponentsProvider 
      apiConfig={{/* Your API configuration */}}
      theme={{}}
    >
      <App></App>
    </EBComponentsProvider>
  )
}
`

export const AuthProvider = () => {
  return (
    <Panel title="Authenication Provider" sampleCode={sampleCode}>
      <Text size="md" mb="sm">
        Next, place the <Code>{code1}</Code> component at the top-level of your
        React application above <Code>{code2}</Code> . This wrapper will
        securely handle the sign-in and authenticate the user.
      </Text>
    </Panel>
  );
};
