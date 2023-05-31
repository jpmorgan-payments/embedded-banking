import {
  Grid,
  Loader,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core';
import { PhoneInput } from 'components';
import type { IndustryCategory } from 'generated-api-models';
import { useIndustryCategories } from '../../hooks/useIndustryCategories';

import type { Step } from '../../models';

export const BusinessDetailsSharedSection: Step = ({ form }) => {
  const {
    data: { items: industryCategories = [] } = {},
    isLoading: isLoadingIndustryCategories,
  } = useIndustryCategories();

  const industryTypes =
    industryCategories.find(
      (item: IndustryCategory) =>
        item.industryCategory === form.values.industryCategory,
    )?.industryTypes ?? [];

  return (
    <>
      <section>
        <Title order={2} mt="xl" mb="xs">
          What is your business's address?
        </Title>
        <Grid>
          <Grid.Col xs={12}>
            <TextInput
              required
              label="Business Address"
              placeholder="Business Address"
              {...form.getInputProps('businessAddress')}
            />
          </Grid.Col>
          <Grid.Col xs={4}>
            <TextInput
              required
              label="City"
              placeholder="City"
              {...form.getInputProps('businessCity')}
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
              {...form.getInputProps('businessZipCode')}
            />
          </Grid.Col>
          <Grid.Col xs={5}>
            <PhoneInput required {...form.getInputProps('businessPhone')} />
          </Grid.Col>
        </Grid>
      </section>
      <section>
        <Title order={2} mt="xl" mb="xs">
          Additional Information
        </Title>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
          mb="md"
        >
          <Select
            label="Industry category"
            placeholder="Select an industry category"
            required
            searchable
            clearable
            disabled={isLoadingIndustryCategories}
            rightSection={
              isLoadingIndustryCategories ? <Loader size="xs" /> : undefined
            }
            data={
              industryCategories.slice(1).map((item) => {
                return {
                  value: item.industryCategory ?? '',
                  label: item.industryCategory,
                };
              }) ?? []
            }
            {...form.getInputProps('industryCategory')}
            onChange={(value: string) => {
              form.getInputProps('industryCategory').onChange(value);
              form.setFieldValue('industryType', '');
            }}
          />
          <Select
            label="Industry type"
            placeholder="Select an industry type"
            required
            searchable
            clearable
            disabled={
              isLoadingIndustryCategories ||
              form.values.industryCategory === null
            }
            rightSection={
              isLoadingIndustryCategories ? <Loader size="xs" /> : undefined
            }
            data={industryTypes.map((type) => {
              return {
                value: type,
                label: type,
              };
            })}
            {...form.getInputProps('industryType')}
          />
        </SimpleGrid>
      </section>
    </>
  );
};
