import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

const WebsiteFromField = ({
  name,
  form,
  labelToken,
  placeholderToken,
  required,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          {labelToken && (
            <FormLabel asterisk={required}>{labelToken}</FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              required={required}
              placeholder={placeholderToken}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { WebsiteFromField };
