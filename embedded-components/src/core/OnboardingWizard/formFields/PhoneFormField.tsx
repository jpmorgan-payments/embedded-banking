import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { PhoneInput } from '@/components/ux/PhoneInput';

const PhoneFormField = ({ name, form, labelToken, required }: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
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
  );
};

export { PhoneFormField };
