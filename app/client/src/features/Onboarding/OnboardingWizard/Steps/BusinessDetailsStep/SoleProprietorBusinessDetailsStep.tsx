import {
  Text,
  Title,
  TextInput,
  Grid,
  Group,
  Checkbox,
  Textarea,
  NumberInput,
} from '@mantine/core';
import { IconBuilding } from '@tabler/icons';

import type { Step } from '../../models';
import { BusinessDetailsSharedSection } from './BusinessDetailsSharedSection';
import { soleProprietorBusinessDetailsSchema } from './BusinessDetailsStep.schema';

const SoleProprietorBusinessDetailsStep: Step = ({ form }) => {
  return (
    <>
      <section>
        <Title order={2} mb="sm">
          Tell us about your business
        </Title>
        <Grid>
          <Grid.Col xs={12} sm={7}>
            <TextInput
              label="Name of Your Business (optional)"
              description="If not provided, we will use your name instead."
              placeholder="Your Business"
              {...form.getInputProps('businessName')}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={5}>
            <TextInput
              label="EIN (optional)"
              description="If you do not have one, you will have to provide your full SSN."
              placeholder="EIN"
              {...form.getInputProps('ein')}
            />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <NumberInput
              withAsterisk
              label="Year of Formation"
              {...form.getInputProps('yearOfFormation')}
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextInput
              required
              disabled={form.values.websiteNotAvailable}
              label="Business Website"
              placeholder="Business Website"
              {...form.getInputProps('website')}
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Group ml="sm">
              <Text weight="bold">OR</Text>
              <Checkbox
                label="My business does not have a website"
                {...form.getInputProps('websiteNotAvailable', {
                  type: 'checkbox',
                })}
              />
            </Group>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Textarea
              label="Business Description"
              placeholder="Provide a brief description of the nature of your business."
              required
              {...form.getInputProps('businessDescription')}
            />
          </Grid.Col>
        </Grid>
      </section>
      <BusinessDetailsSharedSection form={form} />
    </>
  );
};

SoleProprietorBusinessDetailsStep.label = 'Business';
SoleProprietorBusinessDetailsStep.Icon = IconBuilding;
SoleProprietorBusinessDetailsStep.validationSchema =
  soleProprietorBusinessDetailsSchema;

export { SoleProprietorBusinessDetailsStep };
