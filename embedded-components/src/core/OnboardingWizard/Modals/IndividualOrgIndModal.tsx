import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';

import { useSmbdoUpdateClient } from '@/api/generated/smbdo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';
import { individualValidation } from '@/core/OnboardingWizard/WizardSteps/yup/individualValidation.schema';

import { fromFormToIndParty } from '../utils/fromFormToApi';
import { individualSchema } from '../WizardSteps/StepsSchema';
// eslint-disable-next-line
import { RenderForms } from '../WizardSteps/utils/RenderForms';

// import { useContentData } from '../../../utils/useContentData';

type IndividualOrgIndModalProps = {
  data?: any;
  onOpenChange: any;
  title?: string;
  parentPartyId?: string;
  partyId?: string;
  type: 'owner' | 'decision';
  openDialog?: boolean;
};

const IndividualOrgIndModal = ({
  data,
  onOpenChange,
  title,
  partyId,
  type,
  openDialog,
}: IndividualOrgIndModalProps) => {
  // const { getContentToken } = useContentData('schema.businessOwnerFormSchema');
  const { getContentToken: getUserToken } = useContentData(
    'steps.ControllerDetailsStep'
  );

  const [, setUpdating] = useState(0);
  const { clientId } = useRootConfig();
  const { mutateAsync: updateParty, isPending: createPartyisPending } =
    useSmbdoUpdateClient();

  const defaultInitialValues = data ?? {};
  defaultInitialValues.individualEmail = data?.email;

  const schema = yup.object(individualValidation(getUserToken));
  type fromInd = InferType<typeof schema>;

  const form = useForm<fromInd>({
    defaultValues: { ...defaultInitialValues },
    resolver: yupResolver(schema),
  });

  const onSave: SubmitHandler<any> = async () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      const dataInd = fromFormToIndParty(form.getValues());

      if (partyId) {
        const res = await updateParty({
          id: clientId ?? '',
          data: {
            addParties: [
              {
                id: partyId,
                partyType: 'INDIVIDUAL',
                email: form.getValues().individualEmail,
                individualDetails: dataInd,
              },
            ],
          },
        });

        if (res?.id) {
          form.reset({});
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
                individualDetails: dataInd,
                roles:
                  type === 'owner' ? ['BENEFICIAL_OWNER'] : ['DECISION_MAKER'],
              },
            ],
          },
        });

        if (res?.id) {
          form.reset({});
          onOpenChange(res?.id);
        }
      }
    }
  };

  // const handleRemoveOwner = async () => {
  //   const res = await updateParty({
  //     id: clientId ?? '',
  //     data: {
  //       addParties: [
  //         {
  //           id: partyId,
  //           status: 'INACTIVE',
  //         },
  //       ],
  //     },
  //   });
  //   if (res?.id) {
  //     onOpenChange(res?.id);
  //   }
  // };
  try {
    schema.validateSync(form.getValues(), { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.log(`Validation failed at ${error.path}: ${error.message}`);
    } else {
      // Some other error happened
      console.error(error);
    }
  }
  return (
    <Dialog
      open={openDialog}
      onOpenChange={() => {
        if (onOpenChange) {
          onOpenChange();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSave)} className="">
            <RenderForms
              key={data?.email}
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
                  onClick={() => {
                    form.reset({});
                    setUpdating((prev) => prev + 1);
                    // onOpenChange();
                  }}
                  disabled={createPartyisPending}
                >
                  cancel
                </Button>
              </DialogClose>
              <div className="eb-flex eb-justify-end">
                {/* {data ? (
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
              )} */}
                <Button type="submit" disabled={createPartyisPending}>
                  {data ? 'Update' : 'Save'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { IndividualOrgIndModal };
