import { useState } from 'react';
import { SelectValue } from '@radix-ui/react-select';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

const jobTitles = [
  'CEO',
  'CFO',
  'COO',
  'President',
  'Chairman',
  'Senior Branch Manager',
  'Other',
];

type PersonalDetailsFormProps = {
  form: any;
};

const PersonalDetailsForm = ({ form }: PersonalDetailsFormProps) => {
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

  return (
    <>
      <div className="eb-grid eb-grid-cols-3 eb-gap-6 eb-pt-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>First Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Last Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="eb-grid eb-grid-cols-1 eb-gap-4 eb-pt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Email</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="eb-grid eb-grid-cols-2 eb-gap-4 eb-pt-4">
        <FormField
          // TODO if the legal strucutre is a sole propritorship, then don't make this required
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Job Title</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleJobTitleChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTitles?.map((val) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          //TODO make required if job selected is "Other" and disabled otherwise
          control={form.control}
          name="jobTitleDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk={jobTitleIsOther}>
                Job Description
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Phone</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Date of Birth</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="eb-grid eb-grid-cols-1 eb-gap-4 eb-pt-4">
        <FormField
          control={form.control}
          name="ssn9"
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Social Security Number</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export { PersonalDetailsForm };
