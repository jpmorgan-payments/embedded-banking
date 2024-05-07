import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingFormProvider } from './context/form.context';
import { useStepper } from './Stepper/Stepper';
import StepperHeader from './Stepper/StepperHeader';
import {
  BusinessDetailsStep,
  EntityTypeStep,
  OtherOwnersStep,
  PersonalDetailsStep,
  QuestionsStep,
  ReviewStep,
} from './Steps';

export const OnboardingWizard = () => {
  const { activeStep, setCurrentStep } = useStepper();

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
    <ReviewStep
      key={5}
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
            <StepperHeader
              activeStep={activeStep}
              setCurrentStep={setCurrentStep}
            ></StepperHeader>
          )}

          {steps?.map((step, index) => (
            <div
              key={`panel${index}`}
              className={`eb-flex eb-items-center ${activeStep === index ? 'eb-block' : 'eb-hidden'} eb-space-x-4 eb-rounded-md eb-border eb-p-5`}
            >
              {activeStep === index && ActiveStep}
            </div>
          ))}
        </OnboardingFormProvider>
      </CardContent>
    </Card>
  );
};
