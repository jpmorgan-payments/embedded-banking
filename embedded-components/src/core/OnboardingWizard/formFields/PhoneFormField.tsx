import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Group,
} from '@/components/ui';
import { PhoneInput } from '@/components/ux/PhoneInput';

import { PhoneTypeFormField } from './PhoneTypeFormField';

const PhoneFormField = ({ name, form, labelToken, required }: any) => {
  return (
    <Group className="eb-justify-between eb-gap-6">
      <PhoneTypeFormField
        {...{
          form,
          name: 'phoneType',
          labelToken: 'Phone Type',
          required,
          className: 'eb-w-full',
        }}
      />
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="eb-w-full">
            {labelToken && (
              <FormLabel asterisk={required}>{labelToken}</FormLabel>
            )}
            <FormControl>
              <PhoneInput {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Group>
  );
};

export { PhoneFormField };
