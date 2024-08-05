import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { BirthDatePattern } from '@/components/ux/BirthDatePattern';

const DobFormField = ({ name, form, labelToken, required }: any) => {
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
            <BirthDatePattern {...field} required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { DobFormField };
