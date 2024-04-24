import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
 
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddressForm } from './AddressForm/AddressForm';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';


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
  const form = useForm<any>({});

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)}>
        <ScrollArea className="eb-border-t-2 eb-px-6">
          <PersonalDetailsForm parentForm={parentForm} />
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
