import { useMemo } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Button, Text } from '@/components/ui';

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
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <>
          <Card className="eb-flex eb-flex-col eb-flex-wrap eb-overflow-clip">
            <CardHeader>
              <CardTitle>Onboarding Wizards</CardTitle>
            </CardHeader>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <>
                  <Text>
                    There was an error while trying to load this page.
                  </Text>
                  <Text className={`eb-text-gray-600`} size="lg">
                    {error.name}
                  </Text>
                  <Text className={`eb-text-red-600`}>{error.message}</Text>
                  <Button onClick={() => resetErrorBoundary()}>
                    Try again
                  </Button>
                </>
              )}
            >
              <CardContent>
                <OnboardingFormProvider>
                  {activeStep !== 0 && (
                    <StepperHeader
                      activeStep={activeStep}
                      setCurrentStep={setCurrentStep}
                    ></StepperHeader>
                  )}

                  {steps?.map((step, index) => (
                    <Box
                      key={`panel${index}`}
                      className={`eb-flex eb-items-center ${activeStep === index ? 'eb-block' : 'eb-hidden'} eb-space-x-4 eb-rounded-md eb-border eb-p-5`}
                    >
                      {activeStep === index && ActiveStep}
                    </Box>
                  ))}
                </OnboardingFormProvider>
              </CardContent>
            </ErrorBoundary>
          </Card>
        </>
      )}
    </QueryErrorResetBoundary>
  );
};
