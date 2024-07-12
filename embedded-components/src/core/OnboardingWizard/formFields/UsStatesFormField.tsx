import { UsaStates } from 'usa-states';

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
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

const usStates = new UsaStates();

const UsStatesFormField = ({ form, name, required }: any) => {
  const { getContentToken } = useContentData(`components.UsStateSelect`);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="">
            <FormLabel asterisk={required}>
              {getContentToken(`state`)}
            </FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={getContentToken(`selectState`)} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[
                  ...usStates.format({
                    value: 'abbreviation',
                    label: 'name',
                  }),
                ].map(({ value, label }: any) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { UsStatesFormField };
