import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { Ssn9Input } from '@/components/ux/SocialSecurity';

const SsnFormField = ({ name, form, labelToken, required }: any) => {
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
            <Ssn9Input {...field} required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SsnFormField };
