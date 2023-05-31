import { useMemo } from 'react';
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { ValuesTable, Panel, MyDatePicker } from 'components';
import { useAccounts, useAccountBalanceList } from 'features/Accounts/hooks';
import { useRecipients } from 'features/Recipients/hooks';
import { validationSchema } from './utils/validationSchema';

import { convertToTransactionRequest } from './utils/convertToTransactionRequest';
import { transactionCreateResponseMock } from 'mocks';

export const CreateTransactionForm = () => {
  // Initialize the form using the default values defined in validationSchema
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const onSubmit = () => null;

  // Account Data
  const { data: { items: accounts = [] } = {} } = useAccounts();

  const accountsIdList = accounts.map(({ id }) => id ?? '');

  const balanceQueryList = useAccountBalanceList(accountsIdList);

  const accountsSelectData = accounts?.map((account, index) => {
    const { data: balances } = balanceQueryList[index];
    return {
      key: index,
      value: account.id + '',
      label:
        account.paymentRoutingInformation?.accountNumber?.replace(
          /\d(?=\d{4})/g,
          '*',
        ) + ` ($${balances?.balanceTypes?.[0].amount} available)`,
    };
  });

  // Recipient Data
  const { data: { recipients = [] } = {} } = useRecipients();

  const recipientsSelectData = useMemo(
    () =>
      recipients.map((recipient, index) => {
        return {
          key: index,
          value: (recipient.id ?? '') + index,
          label:
            recipient.partyDetails?.firstName +
            ' ' +
            recipient.partyDetails?.lastName,
        };
      }),
    [recipients],
  );

  const selectedRecipient = useMemo(
    () =>
      recipients.find(
        (recipient) =>
          recipient.id ===
          form.values.recipientId.substring(
            0,
            form.values.recipientId.length - 1,
          ),
      ),
    [form.values.recipientId, recipients],
  );

  const selectedRecipientValues = useMemo(() => {
    return [
      {
        title: 'Recipient Information',
        entries: [
          {
            value:
              selectedRecipient?.partyDetails?.firstName +
              ' ' +
              selectedRecipient?.partyDetails?.lastName,
            label: 'Name',
          },
          {
            value: selectedRecipient?.partyDetails?.businessName,
            label: 'Business Name',
          },
          {
            value: selectedRecipient?.account?.number,
            label: 'Account Number',
          },
        ],
      },
    ];
  }, [selectedRecipient]);

  const transactionRequest = useMemo(
    () => convertToTransactionRequest(form.values, selectedRecipient),
    [form.values, selectedRecipient],
  );

  return (
    <Panel
      title="Create Transaction"
      apiCallType="POST"
      apiEndpoint="/transactions"
      requestBody={transactionRequest}
      responseBody={transactionCreateResponseMock}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 'md', cols: 2 },
            { minWidth: 'lg', cols: 1 },
            { minWidth: 'xl', cols: 2 },
          ]}
        >
          <Select
            label="Select Payment Method"
            description="Payment Method"
            placeholder="Choose Payment Method"
            required
            data={['RTP', 'ACH', 'WIRE']}
            defaultValue={'ACH'}
            {...form.getInputProps('paymentMethod')}
          />
          <Select
            label="Select Account (from)"
            description="Account from which funds are drawn"
            placeholder="Choose Account"
            required
            data={accountsSelectData}
            nothingFound="No accounts"
            {...form.getInputProps('accountId')}
          />
          <Select
            label="Payment Recipient (to)"
            description="Person or Vendor You're Paying"
            placeholder="Choose Recipient"
            required
            data={recipientsSelectData}
            nothingFound="No recipients"
            {...form.getInputProps('recipientId')}
          />
          <NumberInput
            label="Amount"
            description="Amount for payment"
            icon="$"
            required
            min={0}
            precision={2}
            parser={(value) => value?.replace(/(,*)/g, '')}
            formatter={(value = '') =>
              !Number.isNaN(parseFloat(value))
                ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : ''
            }
            {...form.getInputProps('amount')}
          />
          <MyDatePicker
            label="Send Payment On"
            description="Date when funds will be withdrawn from the account"
            required
            minDate={new Date()}
            {...form.getInputProps('date')}
          />
        </SimpleGrid>
        {selectedRecipient ? (
          <Box
            mt="md"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
            })}
          >
            <ValuesTable valuesMap={selectedRecipientValues} />
          </Box>
        ) : null}
        <Group mt="xl" position="right">
          <Button type="submit">Review & Submit</Button>
        </Group>
      </form>
    </Panel>
  );
};
