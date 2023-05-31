import { useMemo } from 'react';
import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import {
  ValuesTable,
  Panel,
  MyDatePicker,
  PhoneInput,
  UsStateSelect,
} from 'components';
import { recipientCreateResponseMock } from 'mocks';
import { validationSchema } from './validationSchema';
import { convertToRecipientRequest } from './convertToRecipientRequest';

export const CreateRecipientForm = () => {
  // Casting the validation schema to an empty object gets the default values
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const onSubmit = () => null;

  return (
    <Panel
      title="Create Recipient"
      apiCallType="POST"
      apiEndpoint="/recipients"
      requestBody={convertToRecipientRequest(form.values)}
      responseBody={recipientCreateResponseMock}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Title order={3}>Recipient Info</Title>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 'md', cols: 2 },
            { minWidth: 'lg', cols: 1 },
            { minWidth: 'xl', cols: 2 },
          ]}
        >
          <Select
            label="Recipient Type"
            placeholder="Pick one"
            withAsterisk
            data={[
              {
                value: 'INDIVIDUAL',
                label: 'Individual',
              },
              {
                value: 'ORGANIZATION',
                label: 'Organization',
              },
            ]}
            {...form.getInputProps('type')}
          />
          <TextInput
            label={`Business Name`}
            placeholder="Only needed for businesses"
            {...form.getInputProps('businessName')}
          />
          <TextInput
            label={`First Name`}
            placeholder="Only needed for individuals"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label={`Last Name`}
            placeholder="Only needed for individuals"
            {...form.getInputProps('lastName')}
          />
        </SimpleGrid>
        <Title order={3} mt="md">
          Account Info
        </Title>
        <TextInput
          label="Country Code"
          readOnly
          variant="unstyled"
          placeholder="Enter details"
          withAsterisk
          {...form.getInputProps('creditorCountryCode')}
        />
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 'md', cols: 2 },
            { minWidth: 'lg', cols: 1 },
            { minWidth: 'xl', cols: 2 },
          ]}
        >
          <Select
            label="Account Type"
            placeholder="Select Type"
            data={[
              { value: 'CHECKING', label: 'Checking' },
              { value: 'SAVINGS', label: 'Savings' },
            ]}
            {...form.getInputProps('accountType')}
          />
          <TextInput
            label="Account Number"
            placeholder="Enter recipient account number"
            withAsterisk
            {...form.getInputProps('accountNumber')}
          />

          <Select
            label="Bank Code Type"
            placeholder="Select Type"
            readOnly
            variant="unstyled"
            data={[{ value: 'USABA', label: 'USABA' }]}
            {...form.getInputProps('creditorRoutingCodeType')}
          />
          <TextInput
            label="Routing Number"
            placeholder="Enter recipient 9-digit routing number"
            withAsterisk
            {...form.getInputProps('creditorRoutingNumber')}
          />
        </SimpleGrid>
        <Title order={3} mt="md">
          Contact & Address Info
        </Title>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: 'md', cols: 2 },
            { minWidth: 'lg', cols: 1 },
            { minWidth: 'xl', cols: 2 },
          ]}
        >
          <PhoneInput {...form.getInputProps('phone')} />

          <TextInput
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Address Line 1"
            {...form.getInputProps('address1')}
          />
          <TextInput
            label="Address Line 2"
            {...form.getInputProps('address2')}
          />
          <TextInput
            label="Address Line 3"
            {...form.getInputProps('address3')}
          />
          <TextInput label="City" {...form.getInputProps('city')} />
          <TextInput label="ZIP Code" {...form.getInputProps('zip')} />
          <UsStateSelect {...form.getInputProps('state')} />
          <TextInput
            label="Country"
            readOnly
            variant="unstyled"
            {...form.getInputProps('country')}
          />
        </SimpleGrid>
        <Group mt="xl" position="right">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Panel>
  );
};
