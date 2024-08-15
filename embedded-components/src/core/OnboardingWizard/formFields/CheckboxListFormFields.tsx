import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';

// import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

const CheckBoxListFormFields = ({
  form,
  name,
  // required,
  labelToken,
  optionsList,
}: any) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem>
            <FormLabel>{labelToken}</FormLabel>
            {optionsList &&
              optionsList.map((option: { value: string; label: string }) => (
                <FormField
                  key={option.value}
                  control={form.control}
                  name={name}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option.value}
                        className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            // checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(
                                    [field?.value ?? null, option.value]
                                      .filter((item) => item)
                                      .flat(1)
                                  )
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== option.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="eb-font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { CheckBoxListFormFields };
