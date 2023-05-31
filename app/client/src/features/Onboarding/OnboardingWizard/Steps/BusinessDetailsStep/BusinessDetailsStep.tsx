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
import { businessDetailsSchema } from './BusinessDetailsStep.schema';

const BusinessDetailsStep: Step = ({ form }) => {
  return (
    <>
      <section>
        <Title order={2} mb="xs">
          Tell us about your business
        </Title>
        <Grid>
          <Grid.Col xs={12} sm={8}>
            <TextInput
              required
              label="Name of Your Business"
              placeholder="Your Business"
              {...form.getInputProps('businessName')}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={4}>
            <TextInput
              required
              label="EIN"
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
          <Grid.Col xs={12} md={8}>
            <TextInput
              required
              disabled={form.values.websiteNotAvailable}
              label="Business Website"
              placeholder="Business Website"
              {...form.getInputProps('website')}
            />
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <Group
              noWrap
              sx={(theme) => ({
                [theme.fn.largerThan('md')]: {
                  marginTop: theme.spacing.xl,
                },
              })}
            >
              <Text weight="bold" ml="xs">
                OR
              </Text>
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

BusinessDetailsStep.label = 'Business';
BusinessDetailsStep.Icon = IconBuilding;
BusinessDetailsStep.validationSchema = businessDetailsSchema;

export { BusinessDetailsStep };
