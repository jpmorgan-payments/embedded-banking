import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';

import { AdditionalDecisionMakerModalForm } from './AdditionalDecisionMakersModal/AdditionalDescisionMakersModal';
import { DecisionMakerPanel } from './DecisionMakerPanel/DecisionMakerPanel';

type AdditionalDecisionMakersFormProps = {
  parentForm?: any;
  initialValues?: AdditionalDecisionMakersFormValues | any;
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: (
    values: AdditionalDecisionMakersFormValues | any,
    event: FormEvent<Element>
  ) => void;
};

const AdditionalDecisionMakersForm = ({
  parentForm,
  initialValues,
  onCancel,
  onDelete,
  onSubmit,
}: DecisionMakersFormProps) => {
  const form = useForm<any>({});

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit)}>
        <Text>Additional Decision Makers</Text>
        <Text>Are there any general partners or managing members within in your business who can make decisions on behalf of your company that we have not already captured in the business details?</Text>
        {/* <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <RadioGroup
              name="additionalParties"
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="eb-flex eb-flex-col eb-space-y-1"
            >
              <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                <RadioGroupItem value="Yes" />

                <FormLabel className="eb-font-normal">
                  Yes
                </FormLabel>
              </FormItem>
              <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                <RadioGroupItem value="Noy" />

                <FormLabel className="eb-font-normal">No</FormLabel>
              </FormItem>
            </RadioGroup>
          )}
          
        /> */}
        <Text>Listed business decision makers</Text>
        <div className="eb-box-content eb-h-200 eb-w-200 eb-bg-black-500 eb-rounded-lg eb-border eb-border-border eb-bg-card eb-text-card-foreground eb-shadow-sm"><p>Hi</p></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Click to add a decision maker</Button>
          </DialogTrigger>
          <AdditionalDecisionMakerModalForm />
        </Dialog>
      </form>
    </Form>
  );
};

export { AdditionalDecisionMakersForm };
