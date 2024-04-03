import { Text, Badge } from '@mantine/core';
import { Panel, CodeSamplePanel } from 'components';
import {
  PaymentDetails,
  EBComponentsProvider,
} from '../../../../../embedded-components';

const componentSample = (
  <EBComponentsProvider apiBaseUrl="">
    <PaymentDetails />
  </EBComponentsProvider>
);

const codeSample = `

import { PaymentDetails } from "@jpmorgan-payments/embedded-banking-components"

//SANDBOX TRANSACTION ID 125124
<PaymentDetails transactionId={transactionId}/>
`;

const description =
  'This component allows your client to view details of a payment made through Embedded Banking.';
const title = 'Payment Details';
const type = 'Component';

export const PaymentDetailsSection = () => {
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
