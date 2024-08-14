import { useEffect, useMemo, useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useFormContext } from 'react-hook-form';

import { Dialog } from '@/components/ui/dialog';
import { Title } from '@/components/ui/title';
import { Box, Button, Stack } from '@/components/ui';

// eslint-disable-next-line
import { BusinessCard } from '../../common/BusinessCard';
import { useFormSchema } from '../../context/formProvider.contex';
// eslint-disable-next-line
import { IndividualOrgIndModal } from '../../Modals/IndividualOrgIndModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/Stepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useContentData } from '../../utils/useContentData';
import { useGetDataByClientId } from '../hooks';
import { businessOwnersSchema } from '../StepsSchema';
import { getOrg } from '../utils/getOrgDetails';
import { RenderForms } from '../utils/RenderForms';
import { updateFormValues } from '../utils/updateFormValues';

const BusinessOwnersStep = ({ formSchema, yupSchema }: any) => {
  const form = useFormContext();
  // THIS ENABLES UPDATE ON FORUM RENDER
  form.watch();
  const { getContentToken } = useContentData('steps.BusinessOwnersStep');
  const { updateSchema } = useFormSchema();
  const [open, setOpen] = useState(false);

  const [additionalBusinessOwners, setAdditionalBusinessOwners] =
    useState(false);
  const { activeStep, setCurrentStep } = useStepper();

  const { data, refetch } = useGetDataByClientId();

  const businessOwnerForm = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const handleToggleButton = (val: string) => {
    if (val === 'false') setAdditionalBusinessOwners(false);
    if (val === 'true') setAdditionalBusinessOwners(true);
  };

  const orgData = getOrg(businessOwnerForm);
  useEffect(() => {
    if (businessOwnerForm) {
      // THIS ENABLES UPDATE ON FORUM RENDER
      form.watch();
      updateFormValues(orgData.orgDetails, form.setValue);
      setAdditionalBusinessOwners(
        orgData.orgDetails.significantOwnership === 'true' || false
      );
    }
  }, [orgData?.orgDetails?.significantOwnership]);

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  const onSubmit = async () => {
    const valid = await form.trigger();

    console.log('@@form>>', form.formState, form, valid, '::', yupSchema);
    // if (valid) {
    //   setCurrentStep(activeStep + 1);
    // } else {
    // }
  };

  return (
    <Stack className="eb-component eb-w-full eb-gap-2">
      <Title as="h3">Enter business owner details</Title>

      <form noValidate>
        <Box className="eb-w-full">
          <RenderForms
            {...{
              formSchema: formSchema.form,
              getContentToken: getContentToken,
              form,
              className: `eb-flex eb-flex-col eb-space-y-1`,
              onChange: (val: string, name: string) => {
                handleToggleButton(val);
              },
            }}
          />
        </Box>
      </form>

      {additionalBusinessOwners && businessOwnerForm?.individualDetails && (
        <>
          <Title as="h4" className="eb-my-5">
            Listed business owners
          </Title>

          <div className="eb-grid eb-gap-5 md:eb-grid-cols-2 lg:eb-grid-cols-3">
            {Object.keys(businessOwnerForm?.individualDetails)
              .filter((indID) => {
                return businessOwnerForm.individualDetails[
                  indID
                ].roles.includes('CONTROLLER');
              })
              .map((contollerID: any) => {
                const controller =
                  businessOwnerForm.individualDetails[contollerID];
                return (
                  <div key={contollerID} className="eb-grid-cols-subgrid">
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
                return businessOwnerForm.individualDetails[
                  indID
                ].roles.includes('BENEFICIAL_OWNER');
              })
              .map((contollerID: any) => {
                const controller =
                  businessOwnerForm.individualDetails[contollerID];

                return (
                  <div key={contollerID} className="eb-grid-cols-subgrid">
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
      />
    </Stack>
  );
};

BusinessOwnersStep.title = 'Business Owners';
BusinessOwnersStep.formSchema = businessOwnersSchema;

export { BusinessOwnersStep };
