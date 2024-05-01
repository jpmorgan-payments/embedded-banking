import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { addOtherOwner } from '../../context/form.actions';
import { useOnboardingForm } from '../../context/form.context';
import { AddressForm } from '../../DecisionMakersForm/AddressForm/AddressForm';
import {
  createDecisionMakerFormSchema,
  DecisionMakerFormValues,
} from '../../DecisionMakersForm/DecisionMakerForm.schema';
import { PersonalDetailsForm } from '../../DecisionMakersForm/PersonalDetailsForm/PersonalDetailsForm';
import { useContentData } from '../../useContentData';

const defaultInitialValues = createDecisionMakerFormSchema().cast({});

type AdditionalDecisionMakerModalFormProps = {
  index?: number;
  onOpenChange: any;
};

const AdditionalDecisionMakerModalForm = ({
  index,
  onOpenChange,
}: AdditionalDecisionMakerModalFormProps) => {
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const [defaultValues, setDefaultValues] = useState(defaultInitialValues);

  useEffect(() => {
    if (onboardingForm?.otherOwners?.length) {
      setDefaultValues(onboardingForm?.otherOwners[index]);
    }
  }, [onboardingForm]);

  const form = useForm<DecisionMakerFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });
  const onSubmit: SubmitHandler<DecisionMakerFormValues> = (
    data: DecisionMakerFormValues
  ) => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      const newOnboardingForm = addOtherOwner(onboardingForm, form.getValues());
      setOnboardingForm(newOnboardingForm);
      onOpenChange(false);
    }
  };

  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Enter decision maker details</DialogTitle>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <PersonalDetailsForm form={form} />
            <AddressForm form={form} />

            <div className="eb-mt-[25px] eb-mb-sm eb-flex eb-justify-end">
              <Button type="submit" className="eb-bg-black">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
};

export { AdditionalDecisionMakerModalForm };
