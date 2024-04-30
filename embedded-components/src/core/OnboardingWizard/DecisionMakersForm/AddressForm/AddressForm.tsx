import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const AddressForm = ({ form, fieldNames = {} }: any) => {
  const { addressLine1, addressLine2, addressLine3, city, state, zip } =
    fieldNames;
  return (
    <>
      <div className="eb-grid eb-grid-cols-1 eb-gap-4 eb-pt-4">
        <FormField
          control={form.control}
          name={addressLine1 ?? 'addressLine1'}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Address Line One</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={addressLine2 ?? 'addressLine2'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line Two</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={addressLine3 ?? 'addressLine3'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line Three</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="eb-grid eb-grid-cols-3 eb-gap-4 eb-pt-4">
        <FormField
          control={form.control}
          name={city ?? 'city'}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk> City</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={state ?? 'state'}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>State</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={zip ?? 'zip'}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Zip</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export { AddressForm };
