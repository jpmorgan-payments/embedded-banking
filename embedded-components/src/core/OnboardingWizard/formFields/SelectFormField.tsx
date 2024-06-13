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

const SelectFormField = ({
  name,
  form,
  labelToken,
  placeholderToken,
  required,
  optionsList,
}: any) => {
  console.log('@@optionsList', optionsList, '>>', placeholderToken);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel asterisk={required}>{labelToken}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              // handleAccountTypeChange(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                {/* TODO: placholder needs token */}
                <SelectValue placeholder={placeholderToken} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {optionsList &&
                optionsList.map((items: any) => {
                  return (
                    <SelectItem key={items} value={items}>
                      {items}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SelectFormField };
