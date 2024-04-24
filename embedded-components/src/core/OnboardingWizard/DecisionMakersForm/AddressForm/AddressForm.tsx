
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';


const AddressForm = ({form}: any) => {
  

  return (
    <>
      <div className="eb-grid eb-grid-cols-1 eb-gap-4 eb-pt-4">
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>Address Line One</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
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
          name="addressLine3"
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk> City</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>State</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel withAsterisk>Zip</FormLabel>
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
