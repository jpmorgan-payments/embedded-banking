import { yupResolver } from '@hookform/resolvers/yup';
import {  useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { AddressForm } from '@/core/OnboardingWizard/Forms/AddressForm/AddressForm';
import { PersonalDetailsValues, createPersonalDetailsSchema } from '../../PersonalDetailsStep/PersonalDetailsStep.schema';
import { PersonalDetailsForm } from '@/core/OnboardingWizard/Forms/PersonalDetailsForm/PersonalDetailsForm';
import { useContentData } from '../../../useContentData';
import { addOtherOwner } from '../../../context/form.actions';
import { useOnboardingForm } from '../../../context/form.context';

const defaultInitialValues = createPersonalDetailsSchema().cast({}) ;


type DecisionMakerModalProps = {
  index?: number
}

const DecisionMakerModal = ({index}: DecisionMakerModalProps) => {
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const [defaultValues, setDefaultValues] = useState(defaultInitialValues)

  useEffect(() => {
    if (onboardingForm?.otherOwners?.length) {
      setDefaultValues(onboardingForm?.otherOwners[index])
    }
  },[onboardingForm])

    console.log(onboardingForm?.otherOwners)

  const form = useForm<PersonalDetailsValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(createPersonalDetailsSchema(getFormSchema)),
  });
  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (Object.values(errors).length === 0 && form.formState.isSubmitted) {
      const newOnboardingForm = addOtherOwner(onboardingForm, form.getValues());
      setOnboardingForm(newOnboardingForm);
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
              <DialogClose asChild>
                <Button type="submit"  onClick={onSubmit} className="eb-bg-black">
                  Save
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
};

export { DecisionMakerModal };
