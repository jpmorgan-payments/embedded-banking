import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';

const YesNoFromField = ({
  name,
  form,
  labelToken,
  required,
  className,
  onChange,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={`${className}`}>
            <FormLabel className="eb-my-5" asterisk={required}>
              {labelToken}
            </FormLabel>

            <FormControl>
              <RadioGroup
                onValueChange={(val) => {
                  field.onChange(val, name);
                  form.setValue(name, val);
                  if (onChange) {
                    onChange(val, name);
                  }
                }}
                defaultValue={field?.value}
                // defaultValue={field.value}
                className="eb-flex eb-flex-row eb-space-y-1"
              >
                <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                  <RadioGroupItem value="true" />

                  <FormLabel className="eb-font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                  <RadioGroupItem value="false" />

                  <FormLabel className="eb-font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { YesNoFromField };
