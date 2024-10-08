import { useEffect, useState } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Group,
  Input,
} from '@/components/ui';

import { CheckBoxFormFields } from './CheckboxFormField';

const WebsiteFromField = ({
  name,
  form,
  labelToken,
  placeholderToken,
  required,
}: any) => {
  const [websiteAvailable, setWebsiteAvailable] = useState(
    form.getValues()?.websiteAvailable
  );

  useEffect(() => {
    setWebsiteAvailable(form.getValues()?.websiteAvailable);
  }, [form.getValues()?.websiteAvailable]);

  useEffect(() => {
    if (!websiteAvailable && form.getValues()?.websiteAvailable) {
      form.setValue('website', '');
      form.setValue('websiteAvailable', false);
    } else if (!form.getValues()?.websiteAvailable && websiteAvailable) {
      form.setValue('websiteAvailable', true);
      setWebsiteAvailable(true);
    }
  }, [websiteAvailable]);

  return (
    <Group className="eb-grid-cols-3 eb-justify-start eb-gap-16 eb-align-baseline">
      <CheckBoxFormFields
        {...{
          form,
          onChange: setWebsiteAvailable,
          name: 'websiteAvailable',
          labelToken: 'Do you have a website?',
          required,
          className: 'eb-align-center',
          classNameContainer: 'eb-flex eb-self-center',
        }}
      />
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="">
            {labelToken && (
              <FormLabel asterisk={required}>{labelToken}</FormLabel>
            )}
            <FormControl>
              <Input
                {...field}
                required={required}
                placeholder={placeholderToken}
                disabled={!websiteAvailable}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Group>
  );
};

export { WebsiteFromField };
