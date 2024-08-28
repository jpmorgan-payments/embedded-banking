import { useState } from 'react';
import { Check } from 'lucide-react';

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
  const [websiteAvailable, setWebsiteAvailable] = useState(false);
  return (
    <Group className="eb-justify-start eb-align-baseline eb-grid-cols-3 eb-gap-16">
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
