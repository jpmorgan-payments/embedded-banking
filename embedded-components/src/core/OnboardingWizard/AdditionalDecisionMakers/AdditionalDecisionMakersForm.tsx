import { Key, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';

import { Dialog } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Title } from '@/components/ui/title';

import { useOnboardingForm } from '../context/form.context';
import { createDecisionMakerFormSchema } from '../DecisionMakersForm/DecisionMakerForm.schema';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useContentData } from '../useContentData';
import { AdditionalDecisionMakerModalForm } from './AdditionalDecisionMakersModal/AdditionalDescisionMakersModal';
import { DecisionMakerCard } from './DecisionMakerCard/DecisionMakerCard';

type AdditionalDecisionMakersFormType = {
  setActiveStep: any;
  activeStep: any;
};

const AdditionalDecisionMakersForm = ({
  setActiveStep,
  activeStep,
}: AdditionalDecisionMakersFormType) => {
  const [additionalDecisionMakers, setAdditionalDecisionmakers] =
    useState(false);

  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();

  const form = useForm<any>({
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });

  const handleToggleButton = (val) => {
    if (val === 'No') setAdditionalDecisionmakers(false);
    if (val === 'Yes') setAdditionalDecisionmakers(true);
  };

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (Object.values(errors).length === 0 && form.formState.isSubmitted)
      setActiveStep(activeStep + 1);
  };

  return (
    <div className="eb-grid eb-grid-row-3">
      <Title as="h3">Additional Decision Makers</Title>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="additonalDecisionMakers"
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
          {additionalDecisionMakers && (
            <>
              <Title as="h4">Listed business decision makers</Title>

              <div className="eb-grid eb-grid-cols-3">
                {onboardingForm?.controller && (
                  <div
                    key="controllerPanel"
                    className="eb-grid-cols-subgrid eb-grid-cols-2"
                  >
                    <DecisionMakerCard
                      individual={onboardingForm?.controller}
                    ></DecisionMakerCard>
                  </div>
                )}

                {onboardingForm?.otherOwners?.map(
                  (individual: any, index: Key) => (
                    <div
                      key={index}
                      className="eb-grid-cols-subgrid eb-grid-cols-2"
                    >
                      <DecisionMakerCard
                        individual={individual}
                        key={index}
                      ></DecisionMakerCard>
                    </div>
                  )
                )}
                <Dialog>
                  <div className="eb-bg-black eb-w-24 eb-h-20 eb-text-white eb-rounded-md ">
                    <DialogTrigger>Click to add a decision maker</DialogTrigger>
                  </div>
                  <AdditionalDecisionMakerModalForm form={form} />
                </Dialog>
              </div>
            </>
          )}
          <NavigationButtons
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            onSubmit={onSubmit}
          />
        </form>
      </Form>
    </div>
  );
};

export { AdditionalDecisionMakersForm };
