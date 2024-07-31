import { useMemo, useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';

import { Dialog } from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Title } from '@/components/ui/title';
import { Button, Stack } from '@/components/ui';

// eslint-disable-next-line
import { BusinessCard } from '../../common/BusinessCard';
// eslint-disable-next-line
import { DecisionMakerModal } from '../../Modals/DecisionMakerModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/Stepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useGetDataByClientId } from '../hooks';

// TODO: neeed to make sure that we actuall update or remove
const BusinessOwnersStep = () => {
  const [open, setOpen] = useState(false);
  const [additionalBusinessOwners, setAdditionalBusinessOwners] =
    useState(false);

  const { activeStep, setCurrentStep } = useStepper();

  const { data, refetch } = useGetDataByClientId('client');

  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const handleToggleButton = (val: string) => {
    if (val === 'No') setAdditionalBusinessOwners(false);
    if (val === 'Yes') setAdditionalBusinessOwners(true);
  };

  const onSubmit = async () => {
    setCurrentStep(activeStep + 1);
  };

  return (
    <Stack className="eb-component eb-w-full eb-gap-2">
      <Title as="h3">Enter business owner details</Title>

      <form noValidate>
        <FormField
          name="additionalBusinessOwners"
          render={() => (
            <FormItem>
              <FormLabel asterisk>
                Do you, the controller, own 25% or more of the business?
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={(value) => handleToggleButton(value)}
                  defaultValue="No"
                  className="eb-flex eb-flex-col eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="Yes" />

                    <FormLabel className="eb-font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="No" />

                    <FormLabel className="eb-font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </form>

      {additionalBusinessOwners && reviewData?.individualDetails && (
        <>
          <Title as="h4" className="eb-my-5">
            Listed business owners
          </Title>

          <div className="eb-grid eb-gap-5 md:eb-grid-cols-2 lg:eb-grid-cols-3 ">
            {Object.keys(reviewData?.individualDetails)
              .filter((indID) => {
                return reviewData.individualDetails[indID].roles.includes(
                  'CONTROLLER'
                );
              })
              .map((contollerID: any) => {
                const controller = reviewData.individualDetails[contollerID];
                return (
                  <div key={contollerID} className=" eb-grid-cols-subgrid">
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

            {Object.keys(reviewData?.individualDetails)
              .filter((indID) => {
                return reviewData.individualDetails[indID].roles.includes(
                  'BENEFICIAL_OWNER'
                );
              })
              .map((contollerID: any) => {
                const controller = reviewData.individualDetails[contollerID];

                return (
                  <div key={contollerID} className=" eb-grid-cols-subgrid">
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
              <DecisionMakerModal
                onOpenChange={(id: string) => {
                  setOpen((s) => !s);
                  if (id) {
                    refetch();
                  }
                }}
                title="Enter business owner details"
                parentPartyId={data.partyId}
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
BusinessOwnersStep.formSchema = null;

export { BusinessOwnersStep };
