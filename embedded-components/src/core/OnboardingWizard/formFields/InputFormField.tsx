import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

const InputFormField = ({
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
        <FormItem className="first:eb-mt-2">
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

export { InputFormField };
