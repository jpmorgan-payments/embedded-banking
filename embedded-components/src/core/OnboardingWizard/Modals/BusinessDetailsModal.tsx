import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSmbdoUpdateParty } from '@/api/generated/embedded-banking';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Group, Separator, Stack } from '@/components/ui';
import { AddressForm } from '@/core/OnboardingWizard/Forms/AddressForm/AddressForm';
import { PersonalDetailsForm } from '@/core/OnboardingWizard/Forms/PersonalDetailsForm/PersonalDetailsForm';

import { useOnboardingForm } from '../context/form.context';
import { BusinessCommonForm } from '../Forms/BusinessCommonForm/BusinessCommonForm';
import { BusinessForm } from '../Forms/BusinessDetailsForm/BusinessDetailsForm';
import {
  businessDetailsSchema,
  BusinessDetailsStepValues,
} from '../Steps/BusinessDetailsStep/BusinessDetailsStep.schema';
import {
  addOtherOwner,
  removeOtherOwner,
  updateOtherOwner,
} from '../utils/actions';
import { fromFormToOrgParty } from '../utils/fromFormToApi';
import { useContentData } from '../utils/useContentData';

type BusinessDetailsModalProps = {
  formData?: any;
  onCancel: any;
};

const BusinessDetailsModal = ({
  formData,
  onCancel,
}: BusinessDetailsModalProps) => {
  const { getContentToken: getFormSchema } = useContentData(
    'steps.BusinessDetailsStep'
  );
  const { mutateAsync: updateParty, isPending } = useSmbdoUpdateParty();

  const defaultInitialValues = businessDetailsSchema().cast(
    {}
  ) as BusinessDetailsStepValues;

  const form = useForm<BusinessDetailsStepValues>({
    defaultValues: formData?.orgDetails || defaultInitialValues,
    resolver: yupResolver(businessDetailsSchema(getFormSchema)),
    mode: 'onBlur',
  });

  const onSave: SubmitHandler<BusinessDetailsStepValues> = async () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      const data = fromFormToOrgParty(form.getValues());
     
      const res = await updateParty({
        id: formData.id,
        data: {
          email: formData?.email,
          organizationDetails: data,
        },
      });
     
      if (res?.id) {
        onCancel();
      }
      //   if (owner && index != null) {
      //     const newOnboardingForm = updateOtherOwner(
      //       onboardFFingForm,
      //       form.getValues(),
      //       index
      //     );
      //     setOnboardingForm(newOnboardingForm);
      //     onOpenChange(false);
      //   } else {
      //     const newOnboardingForm = addOtherOwner(
      //       onboardingForm,
      //       form.getValues()
      //     );
      //     setOnboardingForm(newOnboardingForm);
      //     onOpenChange(false);
      //   }
    }
  };

  //   const handleRemoveOwner = useCallback(() => {
  //     if (owner) {
  //       const newOnboardingForm = removeOtherOwner(onboardingForm, owner);
  //       setOnboardingForm(newOnboardingForm);
  //       onOpenChange(false);
  //     } else {
  //       //TODO handle error
  //     }
  //   }, [onboardingForm]);

  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Edit business details</DialogTitle>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSave)}>
            <BusinessForm form={form} />
            <Separator />
            <BusinessCommonForm form={form} />
            <Group className="eb-m-4 eb-justify-center">
              <Button
                onClick={onCancel}
                type="button"
                variant="destructive"
                className="eb-mr-5"
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </Group>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
};

export { BusinessDetailsModal };
