import * as yup from 'yup';
import {
  Button,
  Grid,
  Group,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { Panel } from 'components';
import { caseCreateResponseMock } from 'mocks';

const validationSchema = yup.object({
  type: yup.string().default('').required(),
  subject: yup.string().default('').required(),
  description: yup.string().default('').required(),
});

export type CreateCaseFormValues = yup.InferType<typeof validationSchema>;

export const CreateCaseForm = () => {
  const form = useForm({
    initialValues: validationSchema.cast({}),
    validate: yupResolver(validationSchema),
  });

  const onSubmit = () => null;

  const caseTypeSelectData = [
    { value: 'ACCOUNT', label: 'Account' },
    { value: 'CARD', label: 'Card' },
    { value: 'ENROLLMENT_OR_SIGNUP', label: 'Enrollment/Signup' },
    { value: 'PROFILE', label: 'Profile' },
    { value: 'STATEMENT', label: 'Statement' },
    { value: 'SUSPICIOUS_ACTIVITY', label: 'Suspicious Activity' },
    { value: 'TRANSACTION', label: 'Transaction' },
    { value: 'OTHER', label: 'Other' },
  ];

  return (
    <Panel
      title="Create Case"
      apiCallType="POST"
      apiEndpoint="/cases"
      requestBody={form.values}
      responseBody={caseCreateResponseMock}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid>
          <Grid.Col xs={6}>
            <Select
              label="Case Type"
              description="Case Types are for labeling tickets"
              placeholder="Choose a case type"
              required
              data={caseTypeSelectData}
              {...form.getInputProps('type')}
            />
          </Grid.Col>
          <Grid.Col xs={6}>
            <TextInput
              label="Subject"
              description="Summary of Ticket"
              placeholder="Enter subject"
              required
              {...form.getInputProps('subject')}
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Textarea
              label="Description"
              placeholder="Detailed explanation of case"
              required
              {...form.getInputProps('description')}
            />
          </Grid.Col>
        </Grid>
        <Group mt="xl" position="right">
          <Button type="submit">Open new support case</Button>
        </Group>
      </form>
    </Panel>
  );
};
