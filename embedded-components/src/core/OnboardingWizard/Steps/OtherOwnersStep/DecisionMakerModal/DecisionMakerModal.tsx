import {useCallback} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { AddressForm } from '@/core/OnboardingWizard/Forms/AddressForm/AddressForm';
import { PersonalDetailsForm } from '@/core/OnboardingWizard/Forms/PersonalDetailsForm/PersonalDetailsForm';

import { addOtherOwner, removeOtherOwner, updateOtherOwner } from '../../../context/form.actions';
import { useOnboardingForm } from '../../../context/form.context';
import { useContentData } from '../../../useContentData';
import {
  createPersonalDetailsSchema,
  PersonalDetailsValues,
} from '../../PersonalDetailsStep/PersonalDetailsStep.schema';

type DecisionMakerModalProps = {
  owner?: PersonalDetailsValues;
  onOpenChange: any;
  index?: number;
};

const DecisionMakerModal = ({
  owner,
  onOpenChange,
  index
}: DecisionMakerModalProps) => {
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();

  const defaultInitialValues =
    owner?.firstName ? owner : createPersonalDetailsSchema().cast({});

    console.log(onboardingForm)
    //console.log(defaultInitialValues)

  const form = useForm<PersonalDetailsValues>({
   defaultValues: defaultInitialValues,
    resolver: yupResolver(createPersonalDetailsSchema(getFormSchema)),
  });

  const onSave: SubmitHandler<PersonalDetailsValues> = () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      if (owner && index!=null) {
        const newOnboardingForm = updateOtherOwner(onboardingForm, form.getValues(), index);
        setOnboardingForm(newOnboardingForm);
        onOpenChange(false);
      } else {
        const newOnboardingForm = addOtherOwner(onboardingForm, form.getValues());
        setOnboardingForm(newOnboardingForm);
        onOpenChange(false);
      }
     
    }
  };

  const handleRemoveOwner = useCallback(() => {
    if (owner) {
      const newOnboardingForm = removeOtherOwner(onboardingForm, owner);
      setOnboardingForm(newOnboardingForm);
      onOpenChange(false);
    } else {
      //TODO handle error
      console.log(index)
    }

   },[onboardingForm]);
   
  

  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Enter decision maker details</DialogTitle>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSave)}>
            <PersonalDetailsForm form={form} />
            <AddressForm form={form} />

            <div className="eb-mt-[25px] eb-mb-sm eb-flex eb-justify-end">
              {owner ? (
                <Button
                  onClick={handleRemoveOwner}
                  type="button"
                  variant="destructive"
                  className="eb-mr-5"
                >
                  Remove
                </Button>
              ) : (
                <></>
              )}
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
};

export { DecisionMakerModal };
 