import {
  Box,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';

// import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

const CheckBoxFormFields = ({
  form,
  name,
  required,
  labelToken,
  onChange,
  className,
  classNameContainer,
}: any) => {
  return (
    <Box className={classNameContainer}>
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem className={`${className}`}>
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          if (onChange) {
                            onChange(checked);
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel asterisk={required}>{labelToken}</FormLabel>
                  </FormItem>
                );
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </Box>
  );
};

export { CheckBoxFormFields };
