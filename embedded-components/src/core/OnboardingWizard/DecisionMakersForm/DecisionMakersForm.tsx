import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Text } from '@/components/ui/text';

import { AddressForm } from './AddressForm/AddressForm';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';

type DecisionMakerFormProps = {
=======
import { Button } from '@/components/ui/button';
import {
  Form,
 
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddressForm } from './AddressForm/AddressForm';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';


type DecisionMakerFormProps = {
  editMode?: boolean;
>>>>>>> origin/feature/47600-onboarding-component
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
<<<<<<< HEAD
=======
  editMode,
>>>>>>> origin/feature/47600-onboarding-component
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
}: DecisionMakerFormProps) => {
  const form = useForm<any>({});

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)}>
        <ScrollArea className="eb-border-t-2 eb-px-6">
<<<<<<< HEAD
        <Text size="lg">
            Tell us about yourself
          </Text>
          
          <Text size="lg">
            Please provide your personal information. We will verify that you
            are a controller of the business.
          </Text>
          <PersonalDetailsForm parentForm={parentForm} />
          <Text size="lg">What is your personal address?</Text>
=======
          <PersonalDetailsForm parentForm={parentForm} />
>>>>>>> origin/feature/47600-onboarding-component
          <AddressForm parentForm={parentForm} />
          <Button type="button">Back</Button>
          <Button variant="default" type="submit">
            Next
          </Button>
        </ScrollArea>
      </form>
    </Form>
  );
};

export { DecisionMakerForm };
