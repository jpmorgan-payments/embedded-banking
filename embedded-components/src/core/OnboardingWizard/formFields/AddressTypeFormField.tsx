import { AddressDtoAddressType } from '@/api/generated/smbdo.schemas';
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

const addressIndividualTypes: {
  value: AddressDtoAddressType;
  label: string;
}[] = [
  { value: 'LEGAL_ADDRESS', label: 'Legal' },
  { value: 'MAILING_ADDRESS', label: 'Mailing' },
  { value: 'BUSINESS_ADDRESS', label: 'Business' },
  { value: 'RESIDENTIAL_ADDRESS', label: 'Residential' },
];

const addressORganizationTypes: {
  value: AddressDtoAddressType;
  label: string;
}[] = [
  { value: 'LEGAL_ADDRESS', label: 'Legal' },
  { value: 'MAILING_ADDRESS', label: 'Mailing' },
  { value: 'BUSINESS_ADDRESS', label: 'Business' },
  { value: 'RESIDENTIAL_ADDRESS', label: 'Residential' },
];

const AdressTypeFormField = ({
  form,
  name,
  required,
  labelToken,
  placeholderToken,
  disabled,
  type,
  className,
}: any) => {
  const setAddress =
    type === 'individual' ? addressIndividualTypes : addressORganizationTypes;

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
              value={field.value}
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
                {setAddress.map(({ value, label }: any) => {
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

export { AdressTypeFormField };
