import { Group, Text, Title } from '@mantine/core';
import { EBThemeWrapper } from '@/shared/EBThemeWrapper';

export const PaymentDetails = () => (
  <EBThemeWrapper>
    <Group justify="center">
      <Title order={1}>-$30.00</Title>
    </Group>
    <Group justify="center">
      <Text>to xxx</Text>
    </Group>
    <Title order={2} mt="sm">
      General Information
    </Title>
    {[
      { label: 'Transaction ID', value: '123' },
      { label: 'Status', value: 'Pending' },
      { label: 'Type', value: 'Payout' },
      { label: 'Amount', value: '-$30.00' },
      { label: 'Debit / Credit', value: 'DR' },
      { label: 'Currency', value: 'USD' },
      { label: 'Memo', value: '--' },
      { label: 'Date', value: '2/22/2024' },
      { label: 'Recipient', value: 'John Doe' },
      { label: 'Account number', value: '...1234' },
    ].map(({ label, value }) => (
      <Group justify="space-between" mt="xs" styles={{ root: { borderBottom: '1px dotted grey' } }}>
        <Text fw="bold" size="sm">
          {label}
        </Text>
        <Text size="sm">{value}</Text>
      </Group>
    ))}
  </EBThemeWrapper>
);
