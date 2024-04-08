import { Text, Badge } from '@mantine/core';
import { Panel, ComponentSamplePanel } from 'components';
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

export const PaymentDetailsSection = () => {
  return (
    <Panel
      title={'Payment Details'}
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
      <ComponentSamplePanel component={componentSample} code={`${codeSample}`} />
    </Panel>
  );
};
