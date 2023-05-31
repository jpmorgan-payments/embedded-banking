import type { FormEvent } from 'react';
import { Text, TextInput, Grid, Button, Group } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import { MyDatePicker, PhoneInput, Ssn4Input } from 'components';

import { businessOwnerFormSchema } from './BusinessOwnerForm.schema';
import type { BusinessOwnerFormValues } from './BusinessOwnerForm.schema';

const defaultInitialValues = businessOwnerFormSchema.cast(
  {},
) as BusinessOwnerFormValues;

type BusinessOwnerFormProps = {
  editMode: boolean;
  initialValues?: BusinessOwnerFormValues;
  onCancel: () => void;
  onDelete: () => void;
  onSubmit: (
    values: BusinessOwnerFormValues,
    event: FormEvent<Element>,
  ) => void;
};

const BusinessOwnerForm = ({
  editMode,
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
}: BusinessOwnerFormProps) => {
  const form = useForm<BusinessOwnerFormValues>({
    initialValues: initialValues ?? defaultInitialValues,
    validate: yupResolver(businessOwnerFormSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Grid>
        <Grid.Col xs={4}>
          <TextInput
            label="First Name"
            required
            {...form.getInputProps('firstName')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            label="Middle Name"
            {...form.getInputProps('middleName')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            label="Last Name"
            required
            {...form.getInputProps('lastName')}
          />
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput label="Email" required {...form.getInputProps('email')} />
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput
            label="Address"
            required
            {...form.getInputProps('address')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            required
            label="City"
            placeholder="City"
            {...form.getInputProps('city')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            required
            label="State"
            placeholder="State"
            {...form.getInputProps('businessState')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            required
            label="ZIP Code"
            placeholder="ZIP Code"
            {...form.getInputProps('zipCode')}
          />
        </Grid.Col>
        <Grid.Col xs={6}>
          <PhoneInput required {...form.getInputProps('phone')} />
        </Grid.Col>
        <Grid.Col xs={6}>
          <MyDatePicker required {...form.getInputProps('birthDate')} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Ssn4Input required {...form.getInputProps('ssn4')} />
        </Grid.Col>
        <Grid.Col
          xs={8}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Text color="dimmed" size="sm">
            By federal law, we are required to verify the business owner's
            identity using the Social Security Number. We will attempt to verify
            them with only the last 4 digits.
          </Text>
        </Grid.Col>
      </Grid>
      <Group mt="xl" position="apart">
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Group>
          {editMode ? (
            <Button color="red" onClick={onDelete}>
              Delete
            </Button>
          ) : null}
          <Button type="submit">{editMode ? 'Save' : 'Add'}</Button>
        </Group>
      </Group>
    </form>
  );
};

export { BusinessOwnerForm };
