import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';

import { AddressForm } from '../../DecisionMakersForm/AddressForm/AddressForm';
import { PersonalDetailsForm } from '../../DecisionMakersForm/PersonalDetailsForm/PersonalDetailsForm';
import { Button } from '@/components/ui/button';

type AdditionalDecisionMakerModalFormProps = {
  parentForm?: any;
  initialValues?: AdditionalDecisionMakerFormValues | any;
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: (
    values: AdditionalDecisionMakerModalFormValues | any,
    event: FormEvent<Element>
  ) => void;
};

const AdditionalDecisionMakerModalForm = ({
  parentForm,
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
}: AdditionalDecisionMakerModalFormProps) => {
  const form = useForm<any>({});

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Enter decision maker details</DialogTitle>
        <Form {...form}>
          <form onSubmit={form?.handleSubmit(onSubmit)}>
            <ScrollArea className="eb-border-t-2 eb-px-6">
              <PersonalDetailsForm parentForm={parentForm} />
              <AddressForm parentForm={parentForm} />

              <div className="mt-[25px] flex justify-end">
                <DialogClose asChild>
                  <Button>
                   Save changes
                   </Button>
                </DialogClose>
              </div>
            </ScrollArea>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
};

export { AdditionalDecisionMakerModalForm };
