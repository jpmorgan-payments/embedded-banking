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
  createDecisionMakerFormSchema,
  DecisionMakerFormValues,
} from './validationSchema';

const defaultInitialValues = createDecisionMakerFormSchema().cast(
  {}
) as DecisionMakerFormValues;

const jobTitles = [
  'CEO',
  'CFO',
  'COO',
  'President',
  'Chairman',
  'Senior Branch Manager',
  'Other',
];

const addressTypes = [
  'LEGAL_ADDRESS',
  'MAILING_ADDRESS',
  'BUSINESS_ADDRESS',
  'RESIDENTIAL_ADDRESS',
];

type DecisionMakerFormProps = {
  editMode?: boolean;
  parentForm?: any;
  initialValues?: DecisionMakerFormValues | any;
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: (
    values: DecisionMakerFormValues | any,
    event: FormEvent<Element>
  ) => void;
};

const DecisionMakerForm = ({
  parentForm,
  editMode,
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
}: DecisionMakerFormProps) => {
  const [jobTitleIsOther, setJobTitleIsOther] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('CEO');
  const [selectedAddressType, setSelectedAddressType] =
    useState('LEGAL_ADDRESS');

  const form = useForm<any>({
    initialValues: initialValues ?? defaultInitialValues,
    validateInputOnBlur: true,
    validate: yupResolver(
      createDecisionMakerFormSchema(parentForm?.values?.legalStructure)
    ),
  });

  const handleJobTitleChange = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    if (jobTitle === 'Other') setJobTitleIsOther(true);
  };

  const handleAddressTypeChange = (addressType: string) => {
    setSelectedAddressType(addressType);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="eb-border-t-2 eb-px-6">
          <div className="eb-grid eb-grid-cols-3 eb-gap-4 eb-pt-4">
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
                  <FormLabel>Last Name</FormLabel>
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
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Job Description</FormLabel>
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
                  <FormLabel>Phone</FormLabel>
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
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Social Security Number</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleAddressTypeChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Address Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addressTypes?.map((val) => (
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
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line One</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line Two</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line Three</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="eb-grid eb-grid-cols-3 eb-gap-4 eb-pt-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> City</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

export { DecisionMakerForm };
