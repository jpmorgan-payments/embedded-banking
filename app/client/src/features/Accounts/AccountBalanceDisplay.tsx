import { Text, Code, Paper, SimpleGrid, Skeleton } from '@mantine/core';
import { Panel } from 'components';
import { AccountBalanceDto } from 'generated-api-models';
import { useAccountBalance } from './hooks';

const StatDisplay = ({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: string;
  isLoading: boolean;
}) => {
  return (
    <Paper withBorder radius="md" p="xs">
      <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
        {label}
      </Text>
      {!isLoading ? (
        <Text size="xl" weight={700}>
          {value}
        </Text>
      ) : (
        <Skeleton h="xl" w={120} animate mt="xs" />
      )}
    </Paper>
  );
};

export const AccountBalanceDisplay = () => {
  const { data: accountBalanceResponse, isLoading } = useAccountBalance('1234');

  // Create a formatter based on the currency from API response
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: accountBalanceResponse?.currency ?? 'USD',
  });

  const findBalance = (typeCode: AccountBalanceDto.typeCode) => {
    const balance = accountBalanceResponse?.balanceTypes?.find(
      (balance) => balance.typeCode === typeCode,
    )?.amount;
    return balance ? formatter.format(balance) : 'N/A';
  };

  return (
    <Panel
      title="Account Balances"
      apiCallType="GET"
      apiEndpoint="/accounts/{id}/balances"
      responseBody={accountBalanceResponse}
      isLoading={isLoading}
    >
      <Text>You can fetch an account's balances via a separate call.</Text>
      <Text>
        The type code <Code>ITAV</Code> is the interim available balance and{' '}
        <Code>ITBD</Code> is the interim booked balance.
      </Text>
      <SimpleGrid
        mt="sm"
        cols={1}
        breakpoints={[
          { minWidth: 'md', cols: 2 },
          { minWidth: 'lg', cols: 1 },
          { minWidth: 'xl', cols: 2 },
        ]}
      >
        <StatDisplay
          label="Available Balance - ITAV"
          value={findBalance(AccountBalanceDto.typeCode.ITAV)}
          isLoading={isLoading}
        />
        <StatDisplay
          label="Booked Balance - ITBD"
          value={findBalance(AccountBalanceDto.typeCode.ITBD)}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Panel>
  );
};
