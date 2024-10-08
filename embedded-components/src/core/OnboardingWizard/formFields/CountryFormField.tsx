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

const countryList = [
  { value: 'US', label: 'US' },
  { value: 'Canada', label: 'Canada' },
  { value: 'UK', label: 'UK' },
];

const CountryFormField = ({
  form,
  name,
  required,
  labelToken,
  placeholderToken,
  disabled,
  className,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel asterisk={required}>{labelToken}</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              // defaultValue={field.value}
              value={field.value}
              // value={ field?.value?.[0] || field.value}
              // value={ field?.value?.[0] || field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={placeholderToken || 'Select an option'}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countryList.map(({ value, label }: any) => {
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

export { CountryFormField };
