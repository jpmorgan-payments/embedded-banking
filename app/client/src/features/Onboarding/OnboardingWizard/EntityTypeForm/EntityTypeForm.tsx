import type { FormEvent } from 'react';
import * as yup from 'yup';
import {
  Title,
  Text,
  List,
  SimpleGrid,
  Box,
  Radio,
  Button,
  Group,
  Checkbox,
  Stack,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import type { EntityType } from '../models';

export type EntityTypeFormValues = {
  entityType: EntityType;
  mockEnabled: boolean;
};

const validationSchema = yup.object({
  entityType: yup
    .string()
    .oneOf(['LLC', 'Sole Proprietor'], 'Please select an entity type'),
  mockEnabled: yup.boolean(),
});

const CustomRadioLabel = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
      {title}
    </Text>
    <Text size="sm" color="dimmed">
      {description}
    </Text>
  </div>
);

type EntityTypeFormProps = {
  onSelect: (entityType: EntityType) => void;
  onSubmit: (values: EntityTypeFormValues, event: FormEvent<Element>) => void;
};

export const EntityTypeForm = ({ onSelect, onSubmit }: EntityTypeFormProps) => {
  const entityTypeForm = useForm<EntityTypeFormValues>({
    initialValues: {
      entityType: '',
      mockEnabled: false,
    },
    validate: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={entityTypeForm.onSubmit(onSubmit)}>
      <section>
        <Title order={2} mb="sm">
          What kind of business do you run?
        </Title>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
          <Box>
            <Radio.Group
              label="Please select an entity type"
              required
              {...entityTypeForm.getInputProps('entityType')}
              onChange={(entityType: EntityType) => {
                entityTypeForm.getInputProps('entityType').onChange(entityType);
                onSelect(entityType);
              }}
            >
              <Stack spacing="sm" mt="sm">
                <Radio
                  value="LLC"
                  label={
                    <CustomRadioLabel
                      title="Business (LLC)"
                      description="Your business is registered as a Limited Liability Company."
                    />
                  }
                />
                <Radio
                  value="Sole Proprietor"
                  label={
                    <CustomRadioLabel
                      title="Sole Proprietor"
                      description="You are the sole owner of an incorporated business."
                    />
                  }
                />
              </Stack>
            </Radio.Group>
          </Box>
          {entityTypeForm.values.entityType !== '' && (
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                padding: theme.spacing.lg,
                borderRadius: theme.radius.md,
              })}
            >
              <Text weight="bold">
                To finish registering your business we will need the following
                information from you:
              </Text>
              {entityTypeForm.values.entityType === 'LLC' && (
                <List>
                  <List.Item>Employer Identification Number (EIN)</List.Item>
                  <List.Item>Business Address & Phone</List.Item>
                  <List.Item>Business Website (if there is one)</List.Item>
                  <List.Item>Controller's Address & Phone</List.Item>
                  <List.Item>Controller's SSN</List.Item>
                  <List.Item>Controller's Date of Birth</List.Item>
                  <List.Item>All Owners' Address & Phone</List.Item>
                  <List.Item>All Owners' SSNs</List.Item>
                  <List.Item>All Owners' Date of Birth</List.Item>
                </List>
              )}
              {entityTypeForm.values.entityType === 'Sole Proprietor' && (
                <List>
                  <List.Item>
                    Employer Identification Number (EIN) (if you have one)
                  </List.Item>
                  <List.Item>
                    Business Address & Phone (if different from your address)
                  </List.Item>
                  <List.Item>Business Website (if you have one)</List.Item>
                  <List.Item>Your Address & Phone</List.Item>
                  <List.Item>Your SSN</List.Item>
                  <List.Item>Your Date of Birth</List.Item>
                </List>
              )}
            </Box>
          )}
        </SimpleGrid>
        <Group position="apart" mt="xl">
          <Checkbox
            label="Auto-fill forms with mock data"
            {...entityTypeForm.getInputProps('mockEnabled', {
              type: 'checkbox',
            })}
          />
          <Button
            ml="auto"
            type="submit"
            disabled={entityTypeForm.values.entityType === ''}
            sx={(theme) => ({
              [theme.fn.smallerThan('sm')]: {
                width: '100%',
              },
            })}
          >
            Get started!
          </Button>
        </Group>
      </section>
    </form>
  );
};
