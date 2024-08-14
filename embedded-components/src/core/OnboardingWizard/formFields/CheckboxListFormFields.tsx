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
              optionsList.map((option: string) => (
                <FormField
                  key={option}
                  control={form.control}
                  name={name}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={option}
                        className="eb-flex eb-flex-row eb-items-start eb-space-x-3 eb-space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, option])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== option
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="eb-font-normal">
                          {option}
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
