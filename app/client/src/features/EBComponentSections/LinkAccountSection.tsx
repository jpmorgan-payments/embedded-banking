import { Text, Badge } from '@mantine/core';
import { Panel, CodeSamplePanel } from 'components';
import {
  LinkedAccountWidget,
  EBComponentsProvider,
} from '../../../../../embedded-components';

const componentSample = (
  <EBComponentsProvider apiBaseUrl="">
    <LinkedAccountWidget />
  </EBComponentsProvider>
);

const codeSample = `

import { LinkedAccountWidget } from "@jpmorgan-payments/embedded-banking-components"

<LinkedAccountWidget/>
`;

export const LinkAccountSection = () => {
  return (
    <Panel
      title={'Link Account'}
      customBadge={
        <Badge variant="filled" color="jpmc" radius="xs">
          Component
        </Badge>
      }
    >
      <Text mb="md"> This component allows you to link an account</Text>
      <CodeSamplePanel component={componentSample} code={`${codeSample}`} />
    </Panel>
  );
};
