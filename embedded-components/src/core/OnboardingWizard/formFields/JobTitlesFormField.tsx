import { useState } from 'react';

import { Input } from '@/components/ui/input';
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
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import useGetJobTitle from './hooks/useGetJobTitle';

const JobTitlesFormField = ({ form, name, required }: any) => {
  const jobTitle = form.getValues('jobTitle');

  const jobTitles = useGetJobTitle();
  const { getContentToken } = useContentData('steps.valuesMap');
  const { getContentToken: getContentTokenController } = useContentData(
    'steps.ControllerDetailsStep'
  );
  const [title, setSelectedJobTitle] = useState(jobTitle);
  const jobTitleIsOther = title === 'Other';

  const handleJobTitleChange = (job: string) => {
    setSelectedJobTitle(job);
    if (job !== 'Other') {
      form.setValue('jobTitleDescription', '');
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="">
              <FormLabel asterisk={required}>
                {getContentToken('jobTitle')}
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleJobTitleChange(value);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    {/* TODO: placholder needs token */}
                    <SelectValue
                      placeholder={getContentTokenController('selectPlc')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...jobTitles].map((val) => {
                    return (
                      <SelectItem key={val} value={val}>
                        {val}
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

      <FormField
        control={form.control}
        name="jobTitleDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel asterisk={!!jobTitleIsOther}>
              {getContentTokenController('inputLabel')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={!jobTitleIsOther}
                required={jobTitleIsOther}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { JobTitlesFormField };
