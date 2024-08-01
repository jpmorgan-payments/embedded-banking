import { useEffect } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Button, Text } from '@/components/ui';
import { ServerAlertMessage } from '@/components/ux/ServerAlerts';

import { useRootConfig } from '../EBComponentsProvider/RootConfigProvider';
import { useError } from './context/error.context';
import { useOnboardingForm } from './context/form.context';
import { FormProvider } from './context/formProvider.contex';
import { useIPAddress } from './hooks/getIPAddress';
import NavigationButtons from './Stepper/NavigationButtons';
import { useStepper } from './Stepper/Stepper';
import StepperHeader from './Stepper/StepperHeader';
import { useContentData } from './utils/useContentData';
import { createYupSchema } from './WizardSteps/utils/createYupSchema';

export const OnboardingWizardSchema = ({ title }: any) => {
  const {
    activeStep,
    stepsList,
    setCurrentStep,
    buildStepper,
    CurrentStep,
    currentFormSchema,
  } = useStepper();
  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  const { data: ipAddress, status: ipFetchStatus } = useIPAddress();
  const { clientId } = useRootConfig();
  const { error: isError } = useError();

  useEffect(() => {
    //TODO: Do something if ipFetchStatus, fails, or stalls
  }, [ipFetchStatus]);

  //TODO: Turn all the below effects, and Memoes into a hook
  useEffect(() => {
    if (ipAddress) {
      setOnboardingForm({ ...onboardingForm, ip: ipAddress });
    }
  }, [ipAddress]);

  // Building steps
  useEffect(() => {
    if (clientId) {
      const steps = [
        'Individual',
        'Organization',
        'Business Owners',
        'Decision Makers',
        'Questions',
        'Review',
        'Attestation',
      ];
      buildStepper(steps);
    } else {
      buildStepper();
    }

    if (!CurrentStep) {
      const steps = [
        'Individual',
        'Organization',
        'Business Owners',
        'Decision Makers',
        'Questions',
        'Review',
        'Attestation',
      ];
      if (clientId) {
        buildStepper(steps);
      } else {
        buildStepper();
      }
    }
  }, [clientId, CurrentStep]);

  const { getContentToken } = useContentData(
    `schema.${CurrentStep?.contentData ?? ''}`
  );

  const validationSchema = currentFormSchema?.form
    ? createYupSchema({
        formSchema: currentFormSchema.form,
        getContentToken,
      })
    : ({} as any);

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <Card className="eb-component eb-flex eb-flex-col eb-flex-wrap eb-overflow-clip">
              <CardHeader>
                <CardTitle>{title || 'Onboarding Wizards'}</CardTitle>
              </CardHeader>

              {!!stepsList?.length && (
                <StepperHeader
                  activeStep={activeStep}
                  setCurrentStep={setCurrentStep}
                  steps={stepsList?.map((step: any) => step?.title)}
                  key={stepsList?.length}
                ></StepperHeader>
              )}
              {isError && <ServerAlertMessage />}
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary, error }) => (
                  <>
                    <Text>
                      {/* TODO: should it be tokenized? */}
                      There was an error while trying to load this page.
                    </Text>
                    <Text className="eb-text-gray-600" size="lg">
                      {error.name}
                    </Text>
                    <Text className="eb-text-red-600">{error.message}</Text>
                    <Button onClick={() => resetErrorBoundary()}>
                      Try again
                    </Button>
                  </>
                )}
              >
                <CardContent>
                  <Box className="eb-flex eb-items-center  eb-space-x-4 eb-rounded-md eb-border eb-p-5">
                    <FormProvider>
                      {CurrentStep && (
                        <CurrentStep
                          {...{
                            formSchema: currentFormSchema,
                            yupSchema: validationSchema,
                          }}
                        >
                          <NavigationButtons
                            setActiveStep={setCurrentStep}
                            activeStep={activeStep}
                          />
                        </CurrentStep>
                      )}
                    </FormProvider>
                  </Box>
                </CardContent>
              </ErrorBoundary>
            </Card>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};
