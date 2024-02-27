import { useState } from 'react';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { TextInput, Button, Box, Text, Radio, Group, Stack, Modal } from '@mantine/core';
import { EBThemeWrapper } from '@/shared/EBThemeWrapper';

const validationSchema = yup.object({
  routingNumber: yup
    .string()
    .default('')
    .min(9, 'Routing number must be 9 digits')
    .max(9, 'Routing number cannot exceed 9 digits')
    .matches(/^\d+$/, 'Only digits are allowed')
    .required('Routing number is required'),
  accountNumber: yup
    .string()
    .default('')
    .min(1, 'Account number is required')
    .max(35, 'Account number cannot exceed 35 digits')
    .matches(/^\d+$/, 'Only digits are allowed')
    .required('Account number is required'),
  firstName: yup
    .string()
    .default('')
    .max(70, 'First name is too long')
    .required('First name is required'),
  lastName: yup
    .string()
    .default('')
    .max(70, 'Last name is too long')
    .required('Last name is required'),
  accountType: yup
    .string()
    .default('')
    .oneOf(['CHECKING', 'SAVINGS'], 'Account type is required')
    .required(),
});

type FormValues = yup.InferType<typeof validationSchema>;

export const LinkAccountForm = () => {
  const form = useForm<FormValues>({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
    validateInputOnBlur: true,
  });
  const [opened, setOpened] = useState(false);

  return (
    <EBThemeWrapper>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Link a bank account" size="md">
        <form
          onSubmit={form.onSubmit(() => {
            setOpened(false);
            form.reset();
          })}
        >
          <Stack>
            <Group grow>
              <TextInput
                label="First name"
                required
                data-autofocus
                {...form.getInputProps('firstName')}
              />
              <TextInput label="Last name" required {...form.getInputProps('lastName')} />
            </Group>
            <Radio.Group
              label="Account type"
              required
              styles={() => ({
                error: {
                  marginTop: 10,
                },
              })}
              {...form.getInputProps('accountType')}
            >
              <Group mt="xs">
                <Radio value="CHECKING" label="Checking" />
                <Radio value="SAVINGS" label="Savings" />
              </Group>
            </Radio.Group>
            <TextInput label="Routing number" required {...form.getInputProps('routingNumber')} />
            <TextInput label="Account number" required {...form.getInputProps('accountNumber')} />
            <Group justify="flex-end" mt="xs">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Box>
        <Text size="lg" fw={600} mb="xl">
          You have not linked an external bank account.
        </Text>
        <Button fullWidth onClick={() => setOpened(true)}>
          Link an account
        </Button>
      </Box>
    </EBThemeWrapper>
  );
};
