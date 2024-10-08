import { useEffect } from 'react';

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
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

// eslint-disable-next-line
import { useStepper } from '../Stepper/Stepper';

// import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

// TODO: API FETCH on Titles
const orgTypes = [
  { value: 'SOLE_PROPRIETORSHIP', label: 'Sole Proprietorship' },
  {
    value: 'LIMITED_LIABILITY_COMPANY',
    label: 'Limited Liability Company',
  },
  { value: 'S_CORPORATION', label: 'S Corporation' },
  { value: 'C_CORPORATION', label: 'C Corporation' },
  {
    value: 'UNINCORPORATED_ASSOCIATION',
    label: 'Unincorporate Association',
  },
  { value: 'PARTNERSHIP', label: 'Partnership' },
  { value: 'PUBLICLY_TRADED_COMPANY', label: 'Publicly Traded Company' },
  { value: 'NON_PROFIT_CORPORATION', label: 'Non Profit Corporation' },
  { value: 'GOVERNMENT_ENTITY', label: 'Government Entity' },
];

const OrgTypeFormField = ({
  form,
  name,
  required,
  labelToken,
  placeholderToken,
  disabled,
}: any) => {
  const { removeSteps, buildStepper } = useStepper();
  const { clientId } = useRootConfig();

  useEffect(() => {
    if (form.getValues('organizationType') === 'SOLE_PROPRIETORSHIP') {
      removeSteps(['Decision Makers', 'Business Owners']);
    } else if (clientId) {
      const steps = [
        'Individual',
        'Organization',
        'Business Owners',
        // 'Decision Makers',
        'Questions',
        'Review',
        'Attestation',
      ];
      buildStepper(steps);
      // buildStepper(['Business Owners', 'Decision Makers']);
    } else {
      buildStepper();
    }
  }, [form.getValues('organizationType')]);

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="">
              <FormLabel asterisk={required}>{labelToken}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field?.value}
                disabled={disabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholderToken} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...orgTypes].map(({ value, label }) => {
                    return (
                      <SelectItem key={label} value={value}>
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
    </>
  );
};

export { OrgTypeFormField };
