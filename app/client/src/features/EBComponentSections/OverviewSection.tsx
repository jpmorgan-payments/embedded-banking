import { List, Text, Anchor, rem, ThemeIcon } from '@mantine/core';
import { Panel } from 'components';
import { IconCircleCheck } from '@tabler/icons';

export const OverviewSection = () => {
  return (
    <Panel
      title="Overview"
      sampleCode={`
import {
  EBComponentsProvider,
  LinkAccount
  ...
} from 'embedded-banking-components';

`}
    >
      <Text size="md" mb="sm">
        The Embedded Banking Component library is a publicly-available React.js
        library that allows users to easily integrate J.P. Morgan banking APIs
        into their own websites with pre packaged components. It leverages the
        official{' '}
        <Anchor
          target="_blank"
          underline
          href="https://developer.payments.jpmorgan.com/api/embedded-banking-solutions/embedded-payments/embedded-payments#/"
        >
          Embedded Payments API
        </Anchor>{' '}
        and takes the guesswork out of integration for developers.
      </Text>
      <Text size="md" mb="lg">
        With this library, you can:
      </Text>
      <List
        spacing="lg"
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
        withPadding
        type="ordered"
      >
        <List.Item>Make payments via. ACH, wire transfer, etc.</List.Item>
        <List.Item>View past payments</List.Item>
        <List.Item>Transfer Money</List.Item>
      </List>
    </Panel>
  );
};
