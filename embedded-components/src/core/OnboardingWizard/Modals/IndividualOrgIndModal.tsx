import { useCallback } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  useSmbdoPostParties,
  useSmbdoUpdateClient,
  useSmbdoUpdateParty,
} from '@/api/generated/embedded-banking';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
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

type IndividualOrgIndModalProps = {
  data?: any;
  onOpenChange: any;
  title: string;
  parentPartyId?: string;
  partyId?: string;
  type: 'owner' | 'decision';
};

const IndividualOrgIndModal = ({
  data,
  onOpenChange,
  title,
  parentPartyId,
  partyId,
  type,
}: IndividualOrgIndModalProps) => {
  // const { getContentToken } = useContentData('schema.businessOwnerFormSchema');
  const { getContentToken: getUserToken } = useContentData(
    'steps.ControllerDetailsStep'
  );
  const { clientId } = useRootConfig();
  const { mutateAsync: updateParty, isPending: createPartyisPending } =
    useSmbdoUpdateClient();

  // TODO: Lets imrove this dafault value assignment
  const defaultInitialValues = data?.firstName ? data : {};
  // : createPersonalDetailsSchema().cast({});
  console.log('@@defau', defaultInitialValues);
  defaultInitialValues.individualEmail = data?.email;

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
          id: clientId ?? '',
          data: {
            addParties: [
              {
                id: partyId,
                partyType: 'INDIVIDUAL',
                email: form.getValues().individualEmail,
                individualDetails: data,
              },
            ],
          },
        });

        if (res?.id) {
          onOpenChange(res?.id);
        }
      } else {
        const res = await updateParty({
          id: clientId ?? '',
          data: {
            addParties: [
              {
                partyType: 'INDIVIDUAL',
                email: form.getValues().individualEmail,
                individualDetails: data,
                roles:
                  type === 'owner' ? ['BENEFICIAL_OWNER'] : ['DECISION_MAKER'],
              },
            ],
          },
        });

        if (res?.id) {
          onOpenChange(res?.id);
        }
      }
    }
  };

  const handleRemoveOwner = async () => {
    // const res = await updateParty({
    //   id: clientId ?? '',
    //   data: {
    //     addParties: [
    //       {
    //         id: partyId,
    //         // status: 'INACTIVE',
    //       },
    //     ],
    //   },
    // });
    // if (res?.id) {
    //   onOpenChange(res?.id);
    // }
  };

  return (
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
          <DialogFooter className="eb-pt-4">
            <DialogClose asChild className="eb-mr-auto">
              <Button
                // onClick={() => {
                //   onOpenChange();
                // }}
                disabled={createPartyisPending}
              >
                cancel
              </Button>
            </DialogClose>
            <div className="eb-flex eb-justify-end">
              {data ? (
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
              <Button type="submit" disabled={createPartyisPending}>
                {data ? 'Update' : 'Save'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export { IndividualOrgIndModal };
