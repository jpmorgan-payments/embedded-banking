import { useState } from 'react';
import { UsaStates } from 'usa-states';

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

// import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

// TODO: API FETCH on Titles
const jobTitles = [
  'CEO',
  'CFO',
  'COO',
  'President',
  'Chairman',
  'Senior Branch Manager',
  'Other',
];

const JobTitlesFormField = ({ form, name, required }: any) => {
  const [jobTitleIsOther, setJobTitleIsOther] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('CEO');

  const handleJobTitleChange = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    if (jobTitle === 'Other') {
      setJobTitleIsOther(true);
    } else {
      setJobTitleIsOther(false);
    }
  };

  console.log('@@jobTitles', jobTitles);

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="">
              <FormLabel asterisk={required}>Job Title</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleJobTitleChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    {/* TODO: placholder needs token */}
                    <SelectValue placeholder="Select Job Title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...jobTitles].map((val) => {
                    console.log('@@Titles', val);

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
        //TODO make required if job selected is "Other" and disabled otherwise
        control={form.control}
        name="jobTitleDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel asterisk={!!jobTitleIsOther}>Job Description</FormLabel>
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
