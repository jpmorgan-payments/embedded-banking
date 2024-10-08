import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Group,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import useGetCategories from './hooks/useGetOrgTypes';

const IndustryFormField = ({
  form,
  // name,
  // required,
  // labelToken,
  // placeholderToken,
}: any) => {
  const { watch } = useFormContext();

  const { getContentToken } = useContentData('steps.valuesMap');
  const industryCategories: any = useGetCategories();
  watch();
  const industryTypes =
    industryCategories?.items
      ?.find?.(
        (item: any) =>
          item.industryCategory === form.getValues().industryCategory
      )
      ?.industryTypes?.sort() ?? [];

  return (
    <Group className="eb-w-full eb-justify-between eb-gap-6">
      <FormField
        control={form.control}
        name="industryCategory"
        render={({ field }) => (
          <FormItem className="eb-mt-5 eb-w-full">
            <FormLabel>{getContentToken('industryCategory')}</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
                form.setValue('industryType', '');
                form.setValue('industryCategory', value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={getContentToken('industryCategoryPh')}
                  />
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
          <FormItem className="eb-mt-5 eb-w-full">
            <FormLabel>{getContentToken('industryType')}</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={getContentToken('industryTypePh')}
                  />
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
                      <SelectItem value={items.value} key={items.value}>
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
    </Group>
  );
};

export { IndustryFormField };
