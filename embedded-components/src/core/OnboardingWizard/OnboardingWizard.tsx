import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AdditionalDecisionMakersForm } from './AdditionalDecisionMakers/AdditionalDecisionMakersForm';
import { DecisionMakerForm } from './DecisionMakersForm/DecisionMakersForm';
import { EntityTypeForm } from './EntityTypeForm/EntityTypeForm';
import NavigationButtons from './Stepper/NavigationButtons';
import { useStepper } from './Stepper/Stepper';
import StepperHeader from './Stepper/StepperHeader';

export const OnboardingWizard = () => {
  const { activeStep, setCurrentStep } = useStepper();

  console.log('@@activeStep', activeStep);

  const steps = [
    // EntityTypeForm,
    // DecisionMakerForm,
    // AdditionalDecisionMakersForm,
    // <EntityTypeForm key={0} />,
    // <DecisionMakerForm key={1} />,
    <EntityTypeForm
      key={0}
      setActiveStep={setCurrentStep}
      activeStep={activeStep}
    />,
    <DecisionMakerForm
      key={1}
      setActiveStep={setCurrentStep}
      activeStep={activeStep}
    />,
    <AdditionalDecisionMakersForm
      key={2}
      setActiveStep={setCurrentStep}
      activeStep={activeStep}
    />,
  ];
  const ActiveStep: any = useMemo(() => steps[activeStep], [steps, activeStep]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Wizards</CardTitle>
      </CardHeader>
      <CardContent>
        {activeStep !== 0 && (
          <StepperHeader activeStep={activeStep}></StepperHeader>
        )}
        <div className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-5">
          {/* {steps[activeStep]} */}
          {ActiveStep}
        </div>
      </CardContent>
      {/* TODO: something breaks in hooks when i try to decople oprs of activeSTeps, day wasted */}
      {/* <CardFooter>
        <NavigationButtons
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
          onSubmit={() => {
            console.log(
              '@@on Submit',

              ActiveStep.form
              // ActiveStep.form.trigger,
              // ActiveStep.label
              // ActiveStep.form.formState,
              // ActiveStep.form.formState.isSubmitted
            );
            const { handleSubmit } = ActiveStep.form;
            handleSubmit((data: any) => {
              // const errors = control._formSate;
              // setTimeout(() => {
              const { formState } = ActiveStep.form;
              const { errors } = formState;
              console.log(
                '@@form',
                formState,
                ActiveStep.form.formState.isSubmitted,
                '>>>',
                errors,
                formState.isSubmitted,
                !Object.values(errors).length && formState.isSubmitted
              );
              if (!Object.values(errors).length && formState.isSubmitted)
                setCurrentStep(activeStep + 1 ?? 0);
              // }, 0);
            })();
          }}
        />
      </CardFooter> */}
    </Card>
  );
};
