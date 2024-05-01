import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { OtherOwnersStep } from './Steps/OtherOwnersStep/OtherOwnersStep';
import { BusinessDetailsStep } from './Steps/BusinessDetailsStep/BusinessDetailsStep';
import { OnboardingFormProvider } from './context/form.context';
import { PersonalDetailsStep } from './Steps/PersonalDetailsStep/PersonalDetailsStep';
import { EntityTypeStep } from './Steps/EntityTypeStep/EntityTypeStep';
import {QuestionsStep} from "./Steps/QuestionsStep/QuestionsStep";
import { useStepper } from './Stepper/Stepper';
import StepperHeader from './Stepper/StepperHeader';

export const OnboardingWizard = () => {
  const { activeStep, setCurrentStep } = useStepper();
  console.log('@@activeStep', activeStep);

  const steps = [
    <EntityTypeStep
      key={0}
      setActiveStep={setCurrentStep}
      activeStep={activeStep}
    />,
    <PersonalDetailsStep
      key={1}
      setActiveStep={setCurrentStep}
      activeStep={activeStep}
    />,
    <BusinessDetailsStep
      setActiveStep={setCurrentStep}
      key={2}
      activeStep={activeStep}
    />,
    <OtherOwnersStep
      key={3}
      setActiveStep={setCurrentStep}
      activeStep={activeStep}
    />,
    <QuestionsStep
      key={4}
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
        <OnboardingFormProvider>
          {activeStep !== 0 && (
            <StepperHeader activeStep={activeStep}></StepperHeader>
          )}

          {steps?.map((step, index) => (
            <div
              key={`panel${index}`}
              className={`eb-flex eb-items-center ${activeStep === index ? 'eb-block' : 'eb-hidden'} eb-space-x-4 eb-rounded-md eb-border eb-p-5`}
            >
              {activeStep === index && ActiveStep}
            </div>
          ))}
          {/* <div
            className={`eb-flex eb-items-center ${'eb-block'} eb-space-x-4 eb-rounded-md eb-border eb-p-5`}
          >
            {steps[activeStep]}
          </div> */}
        </OnboardingFormProvider>
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
