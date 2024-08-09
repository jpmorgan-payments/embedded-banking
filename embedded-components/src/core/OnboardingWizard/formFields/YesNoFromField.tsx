import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';

const YesNoFromField = ({ name, form, labelToken, required }: any) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="eb-my-5" asterisk={required}>
              {labelToken}
            </FormLabel>

            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
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
