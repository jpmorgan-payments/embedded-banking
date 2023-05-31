import type { InferType } from 'yup';
import { Button, Group, Select, SimpleGrid } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { Panel } from 'components';
import { useMemo } from 'react';
import { convertToDebitCardRequest } from './utils/convertToDebitCardRequest';
import { validationSchema } from './utils/validationSchema';
import { debitCardCreateResponseMock } from 'mocks';

export type CreateAccountFormValues = InferType<typeof validationSchema>;

export const CreateDebitCardForm = () => {
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const onSubmit = () => null;

  const debitCardRequest = useMemo(
    () => convertToDebitCardRequest(form.values),
    [form.values],
  );

  return (
    <Panel
      title="Request a Debit Card"
      apiCallType="POST"
      apiEndpoint="/debit-cards"
      requestBody={debitCardRequest}
      responseBody={debitCardCreateResponseMock}
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
            label="Select a Debit Card Recipient"
            description="From Client's Related Parties"
            placeholder="Choose Debit Card Recipient"
            required
            data={['John Doe', 'John Doe 2', 'John Doe 3']}
            defaultValue={'John Doe'}
            {...form.getInputProps('party')}
          />
          <Select
            label="Select an Account"
            description="Account to back a Debit Card"
            placeholder="Choose Account"
            required
            data={['*******6789', '*******4567', '*******1234']}
            defaultValue={'*******6789'}
            {...form.getInputProps('account')}
          />
        </SimpleGrid>
        <Group mt="xl" position="right">
          <Button type="submit">Issue a new Debit Card</Button>
        </Group>
      </form>
    </Panel>
  );
};
