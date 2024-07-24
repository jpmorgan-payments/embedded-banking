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

import { fromFormToIndParty } from '../utils/fromFormToApi';
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
  title: string;
  onCancel: any;
  parentPartyId?: string;
  partyId?: string;
};

const DecisionMakerModal = ({
  owner,
  onOpenChange,
  index,
  title,
  parentPartyId,
  partyId,
}: DecisionMakerModalProps) => {
  // const { getContentToken } = useContentData('schema.businessOwnerFormSchema');
  const { getContentToken: getUserToken } = useContentData(
    'steps.ControllerDetailsStep'
  );
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { mutateAsync: updateParty, isPending } = useSmbdoUpdateParty();
  const { mutateAsync: createParty } = useSmbdoPostParties();
  const defaultInitialValues = owner?.firstName ? owner : {};
  // : createPersonalDetailsSchema().cast({});

  const form = useForm<any>({
    defaultValues: defaultInitialValues,
    // resolver: yupResolver({} as any),
  });

  const onSave: SubmitHandler<any> = async () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      const data = fromFormToIndParty(form.getValues());

      if (partyId) {
        const res = await updateParty({
          id: partyId ?? '',
          data: {
            email: owner?.email,
            individualDetails: data,
          },
        });

        if (res?.id) {
          onOpenChange(res?.id);
        }
      } else {
        const res = await createParty({
          data: {
            partyType: 'INDIVIDUAL',
            email: owner?.email,
            parentPartyId,
            individualDetails: data,
            roles: ['DECISION_MAKER'],
          },
        });
        if (res?.id) {
          onOpenChange(res?.id);
        }
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
          <DialogTitle>{title}</DialogTitle>
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
              <Button type="submit">{owner ? 'Update' : 'Save'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </DialogPortal>
  );
};

export { DecisionMakerModal };
