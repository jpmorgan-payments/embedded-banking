import { Text, Badge } from '@mantine/core';
import { Panel, CodeSamplePanel } from 'components';
import { LinkedAccountWidget, EBComponentsProvider } from '../../../../../embedded-components';

const componentSample = (
  <EBComponentsProvider apiBaseUrl="">
    <LinkedAccountWidget />
  </EBComponentsProvider>
);

const codeSample = `

import { LinkedAccountWidget } from "@jpmorgan-payments/embedded-banking-components"

<LinkedAccountWidget/>
`;

const description =
  'This component allows you to link an account';
const title = 'Link Account';
const type = 'Component';

export const LinkAccountSection = () => {
  return (
    <Panel
      title={title}
      customBadge={
        <Badge variant="filled" color="jpmc" radius="xs">
          {type}
        </Badge>
      }
    >
      <Text mb="md">{description}</Text>
      <CodeSamplePanel component={componentSample} code={`${codeSample}`} />
    </Panel>
  );
};
