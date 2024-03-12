import {
  Button,
  Group,
  NumberInput,
  Radio,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';

const validationSchema = yup.object({
  recipient: yup.string().default('').required('Recipient is required'),
  account: yup.string().default('').required('Account is required'),
  amount: yup.string().default('').required('Amount is required'),
  method: yup.string().default('').required('Payment method is required'),
  date: yup.string().default('').required(),
  memo: yup.string().default(''),
});

type FormValues = yup.InferType<typeof validationSchema>;

export const PayOutForm = () => {
  const form = useForm<FormValues>({
    initialValues: validationSchema.cast({
      account: 'MAIN ...4750',
      date: new Date().toLocaleDateString(),
    }),
    validate: yupResolver(validationSchema),
    validateInputOnBlur: true,
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(() => {
          // form.reset();
        })}
      >
        <Stack>
          <Select
            label="Pay to recipient"
            required
            data={['Luella Feeney', 'Jon Smith']}
            data-autofocus
            {...form.getInputProps('recipient')}
          />
          <TextInput
            label="Pay from account"
            required
            disabled
            {...form.getInputProps('account')}
          />
          <NumberInput
            label="Amount to pay"
            name="amount"
            hideControls
            required
            placeholder="0.00"
            {...form.getInputProps('amount')}
          />
          <Radio.Group
            label="Payment method"
            required
            styles={() => ({
              error: {
                marginTop: 10,
              },
            })}
            {...form.getInputProps('method')}
          >
            <Group mt="xs">
              <Radio value="ACH" label="ACH" />
              <Radio value="WIRE" label="Wire" />
            </Group>
          </Radio.Group>
          <TextInput
            label="Date payment sent on"
            disabled
            required
            {...form.getInputProps('date')}
          />
          <TextInput label="Memo (optional)" {...form.getInputProps('memo')} />
          <Group justify="flex-end" mt="xs">
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};
