import { useEffect, useMemo } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Button, Text } from '@/components/ui';

import { useRootConfig } from '../EBComponentsProvider/RootConfigProvider';
import {
  OnboardingFormProvider,
  useOnboardingForm,
} from './context/form.context';
import { useIPAddress } from './hooks/getIPAddress';
import { businessDetailsMock, controllerMock } from './mocks/reviewStep.mock';
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
import { VerificationsStep } from './Steps/VerificationStep/VerificationStep';

export const OnboardingWizard = ({ title, ...props }: any) => {
  const { activeStep, setCurrentStep } = useStepper();
  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  const { data: ipAddress, status: ipFetchStatus } = useIPAddress();
  const { clientId } = useRootConfig();
  console.log('@@IPs', ipAddress, ipFetchStatus);

  useEffect(() => {
    if (props?.isMock) {
      setOnboardingForm({
        businessDetails: businessDetailsMock,
        controller: controllerMock,
        id: '1000010400',
        legalStructure: undefined,
        decisionMakers: undefined,
        outstandingItems: {
          attestationDocumentIds: Array(1),
          documentRequestIds: Array(0),
          partyIds: Array(0),
          partyRoles: Array(0),
          questionIds: Array(3),
        },
        owner: controllerMock,
      });
    }
  }, [props?.isMock]);

  useEffect(() => {
    if (ipAddress) {
      setOnboardingForm({ ...onboardingForm, ip: ipAddress });
    }
  }, [ipAddress]);

  useEffect(() => {
    if (clientId) {
      console.log('@@clientID', clientId);
    }
  }, clientId);

  const steps = clientId
    ? [
        <ReviewStep
          key={1}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <VerificationsStep
          key={2}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
      ]
    : [
        <EntityTypeStep
          key={0}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <BusinessDetailsStep
          setActiveStep={setCurrentStep}
          key={1}
          activeStep={activeStep}
        />,
        <PersonalDetailsStep
          key={2}
          setActiveStep={setCurrentStep}
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
        <VerificationsStep
          key={6}
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
              <CardTitle>{title || 'Onboarding Wizards'}</CardTitle>
            </CardHeader>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <>
                  <Text>
                    {/* TODO: should it be tokenized? */}
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
              </CardContent>
            </ErrorBoundary>
          </Card>
        </>
      )}
    </QueryErrorResetBoundary>
  );
};
