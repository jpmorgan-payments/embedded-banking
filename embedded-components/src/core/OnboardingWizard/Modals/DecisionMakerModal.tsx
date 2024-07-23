import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useOnboardingForm } from '@/core/OnboardingWizard/context/form.context';
import {
  addOtherOwner,
  removeOtherOwner,
  updateOtherOwner,
} from '@/core/OnboardingWizard/utils/actions';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { individualSchema } from '../WizardSteps/StepsSchema';
// eslint-disable-next-line
import { RenderForms } from '../WizardSteps/utils/RenderForms';

// import { useContentData } from '../../../utils/useContentData';

// import {
//   createPersonalDetailsSchema,
//   PersonalDetailsValues,
// } from '../../PersonalDetailsStep/PersonalDetailsStep.schema';

type DecisionMakerModalProps = {
  owner?: any;
  onOpenChange: any;
  index?: number;
};

// {
//   firstName: 'Mary',
//   middleName: 'James',
//   lastName: 'Sue',
//   jobTitle: 'COO',
//   email: 'maryjamessue@fake.website',
//   addressLine1: '2468 Real Ave',
//   city: 'New Fake City',
//   state: 'NY',
//   zipCode: '24680',
//   phone: '2017700500',
//   birthDate: new Date('03-03-1933'),
//   ssn9: '394943213',
// },

const DecisionMakerModal = ({
  owner,
  onOpenChange,
  index,
}: DecisionMakerModalProps) => {
  // const { getContentToken } = useContentData('schema.businessOwnerFormSchema');
  const { getContentToken: getUserToken } = useContentData(
    'steps.ControllerDetailsStep'
  );
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();

  const defaultInitialValues = owner?.firstName ? owner : {};
  // : createPersonalDetailsSchema().cast({});

  const form = useForm<any>({
    defaultValues: defaultInitialValues,
    resolver: yupResolver({} as any),
  });

  const onSave: SubmitHandler<any> = () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      if (owner && index != null) {
        const newOnboardingForm = updateOtherOwner(
          onboardingForm,
          form.getValues(),
          index
        );
        setOnboardingForm(newOnboardingForm);
        onOpenChange(false);
      } else {
        const newOnboardingForm = addOtherOwner(
          onboardingForm,
          form.getValues()
        );
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
    }
  }, [onboardingForm]);

  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter decision maker details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSave)} className="">
            <RenderForms
              {...{
                form,
                formSchema: individualSchema.form,
                getContentToken: getUserToken,
                className: `eb-h-modal-overflow eb-overflow-auto eb-space-y-2 eb-grid eb-grid-cols-3 eb-gap-4 first:eb-mt-8 `,
              }}
            />

            <div className="eb-mb-sm eb-mt-[25px] eb-flex eb-justify-end">
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
