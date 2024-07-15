import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
// import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';
import { industryCategoriesMock as industryCategories } from '@/core/OnboardingWizard/utils/industryCategories.mock';

const IndustryFormField = ({
  form,
  name,
  required,
  labelToken,
  placeholderToken,
}: any) => {
  const industryTypes =
    industryCategories?.items
      ?.find?.(
        (item: any) =>
          item.industryCategory === form.getValues().industryCategory
      )
      ?.industryTypes?.sort() ?? [];

  return (
    <>
      <FormField
        control={form.control}
        name="industryCategory"
        render={({ field }) => (
          <FormItem className="eb-mt-5">
            {/* TODO:// MISIng content Type */}
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
    </>
  );
};

export { IndustryFormField };
