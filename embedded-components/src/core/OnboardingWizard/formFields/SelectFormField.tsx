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

export interface SelectFormFieldProps {
  name: string;
  form: any;
  labelToken: string;
  placeholderToken: string;
  required: boolean;
  disabled: boolean;
  optionsList: any[];
  defaultValue?: string;
  type?: string;
  hidden?: boolean;
}

const SelectFormField = ({
  name,
  form,
  labelToken,
  placeholderToken,
  required,
  optionsList,
  disabled,
  className,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel asterisk={required}>{labelToken}</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // handleAccountTypeChange(value);
              }}
              defaultValue={field?.value}
              disabled={disabled}
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
