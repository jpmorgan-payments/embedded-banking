import { useEffect, useMemo, useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useFormContext } from 'react-hook-form';

import { useSmbdoUpdateClient } from '@/api/generated/smbdo';
import { Dialog } from '@/components/ui/dialog';
import { Title } from '@/components/ui/title';
import { Button, Stack } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

// eslint-disable-next-line
import { BusinessCard } from '../../common/BusinessCard';
import { useError } from '../../context/error.context';
import { useFormSchema } from '../../context/formProvider.context';
// eslint-disable-next-line
import { IndividualOrgIndModal } from '../../Modals/IndividualOrgIndModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/Stepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
// import { useContentData } from '../../utils/useContentData';
import { useGetDataByClientId } from '../hooks';
import { businessOwnersSchema } from '../StepsSchema';
import { getOrg } from '../utils/getOrgDetails';

const BusinessOwnersStep = ({ yupSchema }: any) => {
  const form = useFormContext();
  // const { getContentToken } = useContentData('steps.BusinessOwnersStep');
  const { updateSchema } = useFormSchema();
  const [open, setOpen] = useState(false);

  const { activeStep, setCurrentStep } = useStepper();
  const { setError } = useError();
  const { clientId } = useRootConfig();
  const { data, refetch } = useGetDataByClientId();

  const { mutateAsync: updateOrganization, isPending: createPartyIsPending } =
    useSmbdoUpdateClient();
  const businessOwnerForm = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const orgData = getOrg(businessOwnerForm);

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  useEffect(() => {}, [data]);

  const onSubmit = async () => {
    try {
      await updateOrganization({
        id: clientId ?? '',
        data: {
          addParties: [
            {
              id: orgData?.id ?? '',
              partyType: 'ORGANIZATION',
              email: orgData.email,
              organizationDetails: {
                entitiesInOwnership: form.getValues().entitiesInOwnership,
              },
            },
          ],
        },
      });

      setCurrentStep(activeStep + 1);
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <Stack className="eb-component eb-w-full eb-gap-2">
      <Title as="h3">Enter business owners details</Title>

      {/* <form noValidate>
        <Box className="eb-w-full">
          <RenderForms
            {...{
              formSchema: formSchema.form,
              getContentToken,
              form,
              className: `eb-flex eb-flex-col eb-space-y-1`,
              onChange: (val: string) => {
                handleToggleButton(val);
              },
            }}
          />
        </Box>
      </form> */}

      {businessOwnerForm?.individualDetails && (
        <>
          {/* <Title as="h4" className="eb-my-5">
            Listed business owners
          </Title> */}

          <div className="eb-grid eb-gap-5 md:eb-grid-cols-2 lg:eb-grid-cols-3">
            {Object.keys(businessOwnerForm?.individualDetails)
              .filter((indID) => {
                return businessOwnerForm.individualDetails[
                  indID
                ].roles.includes('CONTROLLER');
              })
              .map((controllerID: any) => {
                const controller =
                  businessOwnerForm.individualDetails[controllerID];
                return (
                  <div key={controllerID} className="eb-grid-cols-subgrid">
                    <BusinessCard
                      controller
                      individual={controller.indDetails}
                      parentPartyId={controller.parentPartyId}
                      refetch={refetch}
                      partyId={controller.id}
                      type="owner"
                    ></BusinessCard>
                  </div>
                );
              })}

            {Object.keys(businessOwnerForm?.individualDetails)
              .filter((indID) => {
                return (
                  businessOwnerForm.individualDetails[indID].roles.includes(
                    'BENEFICIAL_OWNER'
                  ) &&
                  !businessOwnerForm.individualDetails[indID].roles.includes(
                    'CONTROLLER'
                  )
                );
              })
              .map((controllerID: any) => {
                const controller =
                  businessOwnerForm.individualDetails[controllerID];

                return (
                  <div key={controllerID} className="eb-grid-cols-subgrid">
                    <BusinessCard
                      individual={controller.indDetails}
                      parentPartyId={controller.parentPartyId}
                      refetch={refetch}
                      partyId={controller.id}
                      type="owner"
                    ></BusinessCard>
                  </div>
                );
              })}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" className="eb-max-w-56">
                  Click to add a business owner
                </Button>
              </DialogTrigger>
              <IndividualOrgIndModal
                onOpenChange={(id: string) => {
                  setOpen((s) => !s);
                  if (id) {
                    refetch();
                  }
                }}
                title="Enter business owner details"
                parentPartyId={data?.partyId}
                type="owner"
              />
            </Dialog>
          </div>
        </>
      )}

      <NavigationButtons
        setActiveStep={setCurrentStep}
        activeStep={activeStep}
        onSubmit={onSubmit}
        disabled={createPartyIsPending}
      />
    </Stack>
  );
};

BusinessOwnersStep.title = 'Business Owners';
BusinessOwnersStep.formSchema = businessOwnersSchema;

export { BusinessOwnersStep };
