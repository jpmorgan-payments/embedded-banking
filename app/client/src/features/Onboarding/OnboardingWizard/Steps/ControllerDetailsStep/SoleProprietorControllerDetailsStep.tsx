import { Text, Title, TextInput, Grid, Checkbox, Alert } from '@mantine/core';
import { IconInfoCircle, IconUser } from '@tabler/icons';

import { MyDatePicker, PhoneInput, Ssn4Input, Ssn9Input } from 'components';

import type { Step } from '../../models';
import { soleProprietorControllerDetailsSchema } from './ControllerDetailsStep.schema';

const SoleProprietorControllerDetailsStep: Step = ({ form }) => {
  return (
    <section>
      <Title order={2} mb="sm">
        Enter controller details
      </Title>
      <Alert icon={<IconInfoCircle size={16} />} mb="sm">
        The controller oversees the business and financial operations and shares
        responsibility for the organization's economic and financial
        performance.
      </Alert>
      <Text weight="600" mb="sm">
        Please provide your personal information. We will verify that you are a
        controller of the business.
      </Text>
      <Grid>
        <Grid.Col xs={4}>
          <TextInput
            label="First Name"
            required
            {...form.getInputProps('controllerFirstName')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            label="Middle Name"
            {...form.getInputProps('controllerMiddleName')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <TextInput
            label="Last Name"
            required
            {...form.getInputProps('controllerLastName')}
          />
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput
            label="Email"
            required
            {...form.getInputProps('controllerEmail')}
          />
        </Grid.Col>
        <Grid.Col xs={6}>
          <PhoneInput required {...form.getInputProps('controllerPhone')} />
        </Grid.Col>
        <Grid.Col xs={6}>
          <MyDatePicker
            required
            {...form.getInputProps('controllerBirthDate')}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          {form.values.ein ? (
            <Ssn4Input required {...form.getInputProps('controllerSsn4')} />
          ) : (
            <Ssn9Input required {...form.getInputProps('controllerSsn9')} />
          )}
        </Grid.Col>
        <Grid.Col
          xs={8}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {form.values.ein ? (
            <Text color="dimmed" size="sm">
              By federal law, we are required to verify the business
              controller's identity using the Social Security Number. We will
              attempt to verify you with only the last 4 digits.
            </Text>
          ) : (
            <Text color="dimmed" size="sm">
              By federal law, we are required to verify the business
              controller's identity using the Social Security Number. Without
              the EIN, we will need your full SSN to verify you.
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Title order={2} mt="xl" mb="xs">
        Controller Address
      </Title>
      <Grid>
        <Grid.Col xs={12}>
          <Checkbox
            label="My address is the same as the business's address"
            {...form.getInputProps('controllerAddressSameAsBusiness', {
              type: 'checkbox',
            })}
          />
        </Grid.Col>
        {!form.values.controllerAddressSameAsBusiness ? (
          <>
            <Grid.Col xs={12}>
              <TextInput
                label="Address"
                required
                placeholder="Address"
                {...form.getInputProps('controllerAddress')}
              />
            </Grid.Col>
            <Grid.Col xs={4}>
              <TextInput
                required
                label="City"
                placeholder="City"
                {...form.getInputProps('controllerCity')}
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
                {...form.getInputProps('controllerZipCode')}
              />
            </Grid.Col>
          </>
        ) : null}
      </Grid>
    </section>
  );
};

SoleProprietorControllerDetailsStep.label = 'Controller';
SoleProprietorControllerDetailsStep.Icon = IconUser;
SoleProprietorControllerDetailsStep.validationSchema =
  soleProprietorControllerDetailsSchema;

export { SoleProprietorControllerDetailsStep };
