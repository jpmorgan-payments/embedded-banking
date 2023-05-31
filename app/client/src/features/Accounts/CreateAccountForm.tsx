import * as yup from 'yup';
import { Button, Group, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { Panel } from 'components';
import { accountCreateResponseMock } from 'mocks';

const validationSchema = yup.object({
  label: yup.string().default('').required(),
});

export type CreateAccountFormValues = yup.InferType<typeof validationSchema>;

export const CreateAccountForm = () => {
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const onSubmit = () => null;

  return (
    <Panel
      title="Create Account"
      apiCallType="POST"
      apiEndpoint="/accounts"
      requestBody={form.values}
      responseBody={accountCreateResponseMock}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Account Label"
          placeholder="Enter a label for your account"
          required
          {...form.getInputProps('label')}
        />
        <Group mt="xl" position="right">
          <Button type="submit">Create a New Account</Button>
        </Group>
      </form>
    </Panel>
  );
};
