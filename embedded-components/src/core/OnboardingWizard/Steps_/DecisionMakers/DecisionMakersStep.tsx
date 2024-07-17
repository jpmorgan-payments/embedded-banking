import { useMemo, useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import _ from 'lodash';
import { useFormContext } from 'react-hook-form';

import {
  useSmbdoGetClient,
  useSmbdoPostClients,
} from '@/api/generated/embedded-banking';
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
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useOnboardingForm } from '../../context/form.context';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { useStepper } from '../../Stepper/Stepper';
import { formToAPIBody } from '../../utils/apiUtilsParsers';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { DecisionMakerCard } from './DecisionMakerCard/DecisionMakerCard';

// import { DecisionMakerModal } from './DecisionMakerModal/DecisionMakerModal';

const DecisionMakersStep = ({ formSchema, yupSchema }: any) => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const [additionalDecisionMakers, setAdditionalDecisionMakers] =
    useState(false);
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();

  const { clientId, mockSteps, isMockResponse, onRegistration } =
    useRootConfig();
  const { activeStep, setCurrentStep } = useStepper();

  const {
    data,
    refetch,
    isPending: isPendingClients,
  } = isMockResponse
    ? { data: mockSteps.review, refetch: () => null, isPending: false }
    : useSmbdoGetClient((clientId || onboardingForm?.id) as string);

  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const { mutateAsync: postClient, isPending } = useSmbdoPostClients();

  const handleToggleButton = (val: string) => {
    if (val === 'No') setAdditionalDecisionMakers(false);
    if (val === 'Yes') setAdditionalDecisionMakers(true);
  };

  const onSubmit = async () => {
    const apiForm = formToAPIBody(onboardingForm);

    //TODO: should we load next api call everytime we go next?
    try {
      const res = await postClient({ data: apiForm });

      // TODO: do we need clone here?
      const newOnboardingForm = _.cloneDeep(onboardingForm);
      newOnboardingForm.id = res.id;
      newOnboardingForm.outstandingItems = res.outstanding;

      if (onRegistration) {
        onRegistration({ clientId: res.id });
      }

      setOnboardingForm({
        ...newOnboardingForm,
        attestations: res.outstanding.attestationDocumentIds || [],
      });
      setCurrentStep(activeStep + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack className="eb-w-full eb-gap-2">
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

      {additionalDecisionMakers && (
        <>
          <Title as="h4" className="eb-my-5">
            Listed business decision makers
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
                    <DecisionMakerCard
                      controller
                      individual={controller.indDetails}
                    ></DecisionMakerCard>
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
                  <div key={contollerID} className=" eb-grid-cols-subgrid">
                    <DecisionMakerCard
                      controller
                      individual={controller.indDetails}
                    ></DecisionMakerCard>
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
              {/* <DecisionMakerModal onOpenChange={setOpen} /> */}
            </Dialog>
          </div>
        </>
      )}
      <NavigationButtons
        setActiveStep={setCurrentStep}
        activeStep={activeStep}
        disabled={isPending}
        onSubmit={onSubmit}
      />
    </Stack>
  );
};

DecisionMakersStep.title = 'Decision Makers';
DecisionMakersStep.formSchema = null;

export { DecisionMakersStep };
