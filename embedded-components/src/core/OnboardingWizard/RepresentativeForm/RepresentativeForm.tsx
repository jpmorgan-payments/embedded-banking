import { FormEvent, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectValue } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

import {
  representativeFormSchema,
  RepresentativeFormValues,
} from './RepresentativeForm.schema';

const defaultInitialValues = representativeFormSchema().cast(
  {}
) as RepresentativeFormValues;

const jobTitles = [
  'CEO',
  'CFO',
  'COO',
  'President',
  'Chairman',
  'Senior Branch Manager',
  'Other',
];

type RepresentativeFormProps = {
  editMode: boolean;
  initialValues?: RepresentativeFormValues;
  onCancel: () => void;
  onDelete: () => void;
  onSubmit: (
    values: RepresentativeFormValues,
    event: FormEvent<Element>
  ) => void;
};

const RepresentativeForm = ({
  editMode,
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
}: RepresentativeFormProps) => {
  const [selectedJobTitle, setSelectedJobTitle] = useState('CEO'); // Default to individual

  const form = useForm<any>({
    resolver: yupResolver(representativeFormSchema()),
  });

  const handleJobTitleChange = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
  };
  const jobTitleIsOther = form.values.jobTitle === 'Other';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="eb-max-h-[calc(min(60rem,100vh)-5.5rem)] eb-border-t-2 eb-px-6">
          <div className="eb-grid eb-gap-4 eb-pt-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
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
                    <Input {...field} required />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleJobTitleChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Job Titlee" />
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
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
            control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          

            <input
              label={getContentToken(`labelAddr`)}
              withAsterisk
              aria-required="true"
              placeholder={getContentToken(`labelPlc`)}
              description={getContentToken?.(
                'startWithNumber',
                undefined,
                'common'
              )}
              autoComplete="address-line1"
              {...form.getInputProps('addressLine1')}
            />

            <input
              placeholder={getContentToken(`labelAddr2`)}
              autoComplete="address-line2"
              {...form.getInputProps('addressLine2')}
            />

            <input
              placeholder={getContentToken(`labelAddr3`)}
              autoComplete="address-line3"
              {...form.getInputProps('addressLine3')}
            />

            <input
              withAsterisk
              aria-required="true"
              label={getContentToken(`labelCity`)}
              placeholder={getContentToken(`labelCity`)}
              autoComplete="address-level2"
              {...form.getInputProps('city')}
            />

            <input
              withAsterisk
              aria-required="true"
              autoComplete="address-level1"
              {...form.getInputProps('state')}
            />

            <Input.Wrapper
              withAsterisk
              aria-required="true"
              label={getContentToken(`labelZip`)}
              {...form.getInputProps('zipCode')}
            >
              <input
                component={InputMask}
                aria-required="true"
                autoComplete="address-level1"
                mask="99999"
                placeholder={getContentToken(`placeZip`)}
                {...form.getInputProps('zipCode')}
              />
            </Input.Wrapper>

            <input
              withAsterisk
              aria-required="true"
              {...form.getInputProps('phone')}
            />

            <input
              withAsterisk
              aria-required="true"
              maxDate={new Date()}
              {...form.getInputProps('birthDate')}
            />

            <input
              withAsterisk
              aria-required="true"
              {...form.getInputProps('ssn9')}
            />

            <Button onClick={onCancel}>Cancel</Button>

            {editMode ? (
              <Button color="red" onClick={onDelete}>
                Delete
              </Button>
            ) : null}
            <Button type="submit">Submit</Button>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
};

export { RepresentativeForm };
