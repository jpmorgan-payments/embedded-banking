import { useEffect, useMemo, useState } from 'react';

import { useSmbdoGetClient } from '@/api/generated/smbdo';
import { Title } from '@/components/ui/title';
import { Button, Stack } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

// eslint-disable-next-line
import { BusinessCard } from '../../common/BusinessCard';
// import { useError } from '../../context/error.context';
import { useFormSchema } from '../../context/formProvider.context';
// eslint-disable-next-line
import { IndividualOrgIndModal } from '../../Modals/IndividualOrgIndModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/Stepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
// import { useContentData } from '../../utils/useContentData';

import { businessOwnersSchema } from '../StepsSchema';

const BusinessOwnersStep = ({ yupSchema }: any) => {
  // const { getContentToken } = useContentData('steps.BusinessOwnersStep');
  const { updateSchema } = useFormSchema();
  const [openDialog, setDialogOpen] = useState(false);
  const { activeStep, setCurrentStep } = useStepper();

  const { clientId } = useRootConfig();
  const { data, refetch } = useSmbdoGetClient(clientId ?? '', {
    query: {
      enabled: !!clientId,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  });

  const businessOwnerForm = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  useEffect(() => {}, [data]);

  const onSubmit = async () => {
    setCurrentStep(activeStep + 1);
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
                  <div key={controller.indDetails.email} className="eb-grid-cols-subgrid">
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
                  <div key={controller.indDetails.email} className="eb-grid-cols-subgrid">
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
            <Button
              type="button"
              variant="outline"
              className="eb-max-w-56"
              onClick={() => {
                setDialogOpen((s) => !s);
              }}
            >
              Click to add a business owner
            </Button>

            {openDialog && (
              <IndividualOrgIndModal
                onOpenChange={(id?: string) => {
                  setDialogOpen((s) => !s);
                  if (id) {
                    refetch();
                  }
                }}
                title="Enter business owner details"
                parentPartyId={data?.partyId}
                key={data?.partyId}
                type="owner"
                openDialog={openDialog}
              />
            )}
          </div>
        </>
      )}

      <NavigationButtons
        setActiveStep={setCurrentStep}
        activeStep={activeStep}
        onSubmit={onSubmit}
      />
    </Stack>
  );
};

BusinessOwnersStep.title = 'Business Owners';
BusinessOwnersStep.formSchema = businessOwnersSchema;

export { BusinessOwnersStep };
