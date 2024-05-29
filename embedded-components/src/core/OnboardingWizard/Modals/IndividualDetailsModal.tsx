import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  useSmbdoPostParties,
  useSmbdoUpdateParty,
} from '@/api/generated/embedded-banking';
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
  createPersonalDetailsSchema,
  PersonalDetailsValues,
} from '../Steps/PersonalDetailsStep/PersonalDetailsStep.schema';
import { addOtherOwner } from '../utils/actions';
import { fromFormToIndParty, fromFormToOrgParty } from '../utils/fromFormToApi';
import { useContentData } from '../utils/useContentData';

type IndividualDetailsModalProps = {
  formData?: any;
  onCancel: any;
  create?: boolean;
};

const IndividualDetailsModal = ({
  formData,
  onCancel,
  create = false,
}: IndividualDetailsModalProps) => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken: getFormSchema } = useContentData(
    'steps.BusinessDetailsStep'
  );
  const { mutateAsync: updateParty, isPending } = useSmbdoUpdateParty();
  const { mutateAsync: createParty } = useSmbdoPostParties();
  const defaultInitialValues = createPersonalDetailsSchema().cast(
    {}
  ) as PersonalDetailsValues;

  const form = useForm<PersonalDetailsValues>({
    defaultValues: formData?.indDetails || defaultInitialValues,
    resolver: yupResolver(createPersonalDetailsSchema(getFormSchema)),
    mode: 'onBlur',
  });

  const onSave: SubmitHandler<PersonalDetailsValues> = async () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      const data = fromFormToIndParty(form.getValues());

      if (!create) {
        const res = await updateParty({
          id: formData.id,
          data: {
            email: formData?.email,
            individualDetails: data,
          },
        });

        if (res?.id) {
          onCancel();
        }
      } else {
        const res = await createParty({
          data: {
            partyType: 'INDIVIDUAL',
            email: formData?.email,
            individualDetails: data,
            roles: ['DECISION_MAKER'],
          },
        });
        const newOnboardingForm = addOtherOwner(
          onboardingForm,
          form.getValues()
        );
        setOnboardingForm(newOnboardingForm);

        if (res?.id) {
          onCancel();
        }
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

  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogTitle>Edit individual details</DialogTitle>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSave)}>
            <PersonalDetailsForm form={form} />
            <AddressForm form={form} />
            <Group className="eb-m-4 eb-justify-center">
              <Button
                onClick={() => {
                  onCancel();
                }}
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

export { IndividualDetailsModal };
