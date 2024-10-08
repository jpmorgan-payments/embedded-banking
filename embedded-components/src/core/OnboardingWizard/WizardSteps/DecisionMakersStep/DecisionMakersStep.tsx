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
import { IndividualOrgIndModal } from '../../Modals/IndividualOrgIndModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/Stepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useGetDataByClientId } from '../hooks';

// TODO: QUESTION: What is the purpose of this component?
const DecisionMakersStep = () => {
  const [open, setOpen] = useState(false);
  const [additionalDecisionMakers, setAdditionalDecisionMakers] =
    useState(false);

  const { activeStep, setCurrentStep } = useStepper();
  const { data, refetch } = useGetDataByClientId();

  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const handleToggleButton = (val: string) => {
    if (val === 'No') setAdditionalDecisionMakers(false);
    if (val === 'Yes') setAdditionalDecisionMakers(true);
  };

  const onSubmit = async () => {
    setCurrentStep(activeStep + 1);
  };

  return (
    <Stack className="eb-component eb-w-full eb-gap-2">
      <Title as="h3">Additional Decision Makers</Title>

      <form noValidate>
        <FormField
          name="additionalDecisionMakers"
          render={() => (
            <FormItem>
              <FormLabel asterisk>
                Are there any general partners or managing members within in
                your business who can make decisions on behalf of your company
                that we have not already captured in the business details?
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

      {additionalDecisionMakers && reviewData?.individualDetails && (
        <>
          <Title as="h4" className="eb-my-5">
            Listed business decision makers
          </Title>

          <div className="eb-grid eb-gap-5 md:eb-grid-cols-2 lg:eb-grid-cols-3">
            {Object.keys(reviewData?.individualDetails)
              .filter((indID) => {
                return reviewData.individualDetails[indID].roles.includes(
                  'CONTROLLER'
                );
              })
              .map((contollerID: any) => {
                const controller = reviewData.individualDetails[contollerID];
                return (
                  <div key={contollerID} className="eb-grid-cols-subgrid">
                    <BusinessCard
                      controller
                      individual={controller.indDetails}
                      parentPartyId={controller.parentPartyId}
                      refetch={refetch}
                      partyId={controller.id}
                      type="decision"
                    ></BusinessCard>
                  </div>
                );
              })}

            {Object.keys(reviewData?.individualDetails)
              .filter((indID) => {
                return !reviewData.individualDetails[indID].roles.includes(
                  'CONTROLLER'
                );
              })
              .map((contollerID: any) => {
                const controller = reviewData.individualDetails[contollerID];
                return (
                  <div key={contollerID} className="eb-grid-cols-subgrid">
                    <BusinessCard
                      individual={controller.indDetails}
                      parentPartyId={controller.parentPartyId}
                      refetch={refetch}
                      partyId={controller.id}
                      type="decision"
                    ></BusinessCard>
                  </div>
                );
              })}

            <Dialog open={open} onOpenChange={setOpen}>
              <Button
                onClick={() => setOpen(true)}
                type="button"
                variant="outline"
                className="eb-max-w-56"
              >
                <DialogTrigger>Click to add a decision maker</DialogTrigger>
              </Button>
              <IndividualOrgIndModal
                onOpenChange={(id: string) => {
                  setOpen((s) => !s);
                  if (id) {
                    refetch();
                  }
                }}
                title="Enter decision maker details"
                parentPartyId={data?.partyId}
                type="decision"
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

DecisionMakersStep.title = 'Decision Makers';
DecisionMakersStep.formSchema = null;

export { DecisionMakersStep };
