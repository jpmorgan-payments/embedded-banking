/* eslint react/prop-types: 0 */
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

import { industryCategoriesMock as industryCategories } from '../../utils/industryCategories.mock';
import { useContentData } from '../../utils/useContentData';
import { AddressForm } from '../AddressForm/AddressForm';

export const BusinessCommonForm: any = ({ form }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Grid className={`eb-grid-flow-row eb-gap-4 eb-pt-4 `}>
        <Stack>
          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <Stack className={`eb-grid-flow-row eb-gap-4 eb-pt-4 `}>
                  <FormLabel asterisk>
                    {getContentToken(`businessDescription.label`)}
                  </FormLabel>
                  <FormControl>
                    <TextArea
                      {...field}
                      size="md"
                      // @ts-ignore
                      placeholder={
                        getContentToken?.(`businessDescription.placeholder`) ??
                        ''
                      }
                      className="eb-h-40 eb-border eb-border-solid"
                    />
                  </FormControl>
                  <FormMessage />
                </Stack>
              </FormItem>
            )}
          />

          <Grid className="eb-mb-5 eb-grid-flow-row eb-grid-cols-2 eb-gap-4  eb-pt-4">
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
          </Grid>
          <Grid className="eb-mb-5 eb-grid-flow-row eb-grid-cols-2 eb-gap-4  eb-pt-4">
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

            <Group className="eb-flex eb-flex-row eb-flex-wrap eb-content-center  eb-gap-2">
              <Text className="eb-mx-3 eb-font-bold">
                {getContentToken(`text.or`)}
              </Text>
              <FormField
                control={form.control}
                name="websiteNotAvailable"
                render={({ field }) => (
                  <FormItem>
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
                    <FormLabel className="eb-p-3">
                      My business does not have a website
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Group>
          </Grid>
          <Grid className="eb-mb-5 eb-grid-flow-row eb-grid-cols-2 eb-gap-4  eb-pt-4">
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
          </Grid>
          <Stack>
            <Title as="h2" className="eb-my-5">
              {getContentToken(`addressSectionTitle`)}
            </Title>
            <Group className="eb-flex eb-flex-row eb-flex-wrap eb-content-center  eb-gap-2">
              <FormField
                control={form.control}
                name="businessAddressSameAsController"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="eb-px-3">
                      {getContentToken(`businessAddressSameAsController.label`)}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Group>
          </Stack>
        </Stack>
      </Grid>

      <Title as="h2" className="eb-my-3">
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
          <FormItem className="eb-mt-5">
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
                    ?.sort((a: any, b: any) =>
                      a?.value?.localeCompare?.(b?.value)
                    ) ?? []
                )?.map((items: any) => {
                  return (
                    <SelectItem key={items.value} value={items.value}>
                      {items.value}
                    </SelectItem>
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
          <FormItem className="eb-mt-5">
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
