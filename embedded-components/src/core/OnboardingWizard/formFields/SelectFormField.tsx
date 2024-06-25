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
  defaultValue,
}: any) => {
  console.log('@@optionsList', optionsList, '>>', placeholderToken);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log('@@field', field, defaultValue);
        return (
          <FormItem className="">
            <FormLabel asterisk={required}>{labelToken}</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              defaultValue={defaultValue}
            >
              <FormControl>
                <SelectTrigger>
                  {/* TODO: placholder needs token */}
                  <SelectValue placeholder={placeholderToken} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {optionsList &&
                  optionsList.map(({ value, label }: any) => {
                    return (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { SelectFormField };
