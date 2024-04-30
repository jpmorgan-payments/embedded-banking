/* eslint react/prop-types: 0 */
import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Grid } from '@/components/ui/grid';
import { Group } from '@/components/ui/group';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { TextArea } from '@/components/ui/textarea';
import { Title } from '@/components/ui/title';

import { AddressForm } from '../DecisionMakersForm/AddressForm/AddressForm';
import { industryCategoriesMock as industryCategories } from '../mocks/industryCategories.mock';
import type { Step } from '../models';
import { useContentData } from '../useContentData';

export const BusinessDetailsCommon: Step = ({ form }: any) => {
  const isLoadingIndustryCategories = false;
  const industryTypes =
    industryCategories?.items
      ?.find?.(
        (item: any) =>
          item.industryCategory === form.getValues().industryCategory
      )
      ?.industryTypes?.sort() ?? [];

  const { websiteNotAvailable } = form.getValues();
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  return (
    <>
      <Grid className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'} `}>
        <Stack>
          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <Stack>
                  <FormLabel asterisk>
                    {getContentToken(`businessDescription.label`)}
                  </FormLabel>
                  <FormControl>
                    <TextArea
                      {...field}
                      size="md"
                      placeholder={getContentToken(
                        `businessDescription.placeholder`
                      )}
                      className="eb-h-40 eb-border-solid eb-border"
                    />
                  </FormControl>
                  <FormMessage />
                </Stack>
              </FormItem>
            )}
          />

          <Group className="eb-justify-between">
            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>
                    {getContentToken(`businessEmail.label`)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      placeholder={
                        getContentToken(`businessEmail.placeholder`) as string
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>
                    {getContentToken(`businessPhone.label`)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      placeholder={
                        getContentToken(`businessPhone.placeholder`) as string
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Group>
          <Group className="eb-justify-between">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>
                    {getContentToken(`businessWebsite.label`)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      placeholder={
                        !websiteNotAvailable
                          ? (getContentToken(
                              `businessWebsite.placeholder`
                            ) as string)
                          : (getContentToken(`text.notAvailable`) as string)
                      }
                      className="eb-lowercase"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Group className="">
              <Text className="eb-font-bold">{getContentToken(`text.or`)}</Text>
              <FormField
                control={form.control}
                name="websiteNotAvailable"
                render={({ field }) => (
                  <FormItem className="eb-flex eb-flex-row eb-mt-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => {
                          form
                            .getInputProps('websiteNotAvailable', {
                              type: 'checkbox',
                            })
                            .onChange(value);
                          form.clearFieldError('website');
                        }}
                      />
                    </FormControl>
                    <FormLabel>My business does not have a website</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Group>
          </Group>
          <Group className="eb-justify-between">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>
                    {getContentToken(`countryOfFormation.label`)}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} required disabled value="US" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Number */}
            <FormField
              control={form.control}
              name="yearOfFormation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>
                    {getContentToken(`yearOfFormation.label`)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      type="number"
                      placeholder={
                        !websiteNotAvailable
                          ? (getContentToken(
                              `yearOfFormation.placeholder`
                            ) as string)
                          : (getContentToken(`text.notAvailable`) as string)
                      }
                      className="eb-lowercase"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Group>
          <Stack>
            <Title as="h2" className="eb-my-2">
              {getContentToken(`addressSectionTitle`)}
            </Title>

            <FormField
              control={form.control}
              name="businessAddressSameAsController"
              render={({ field }) => (
                <FormItem className="eb-flex eb-flex-row eb-mt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    {getContentToken(`businessAddressSameAsController.label`)}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Stack>
        </Stack>
      </Grid>

      <Title as="h2" className="eb-my-8">
        {getContentToken(`title2`)}
      </Title>
      <AddressForm
        form={form}
        fieldNames={{
          addressLine1: 'businessAddressLine1',
          addressLine2: 'businessAddressLine2',
          addressLine3: 'businessAddressLine3',
          city: 'businessCity',
          state: 'businessState',
          zip: 'businessZipCode',
        }}
      />
      <FormField
        control={form.control}
        name="industryCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Type</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(
                  industryCategories?.items
                    ?.slice(1)
                    ?.map((item: any) => {
                      return {
                        value: item.industryCategory ?? '',
                        label: item.industryCategory,
                      };
                    })
                    ?.sort((a, b) => a?.value?.localeCompare?.(b?.value)) ?? []
                )?.map((items: any) => {
                  return (
                    <SelectItem value={items.value}>{items.value}</SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="industryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Type</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {industryTypes
                  .map((type: any) => {
                    return {
                      value: type,
                      label: type,
                    };
                  })
                  ?.map((items: any) => {
                    return (
                      <SelectItem value={items.value}>{items.value}</SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
