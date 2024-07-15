import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Stack,
  TextArea,
} from '@/components/ui';

const TextareaFormField = ({
  name,
  form,
  labelToken,
  required,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="first:eb-mt-4">
          <Stack className="">
            {labelToken && (
              <FormLabel asterisk={required} className="eb-mb-4">
                {labelToken}
              </FormLabel>
            )}
            <FormControl>
              <TextArea {...field} />
            </FormControl>
            <FormMessage />
          </Stack>
        </FormItem>
      )}
    />
  );
};

export { TextareaFormField };
