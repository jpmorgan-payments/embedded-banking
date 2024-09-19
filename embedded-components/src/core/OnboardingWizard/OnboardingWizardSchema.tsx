import { useEffect, useMemo } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { useSmbdoGetClient } from '@/api/generated/smbdo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { Box, Button, Text } from '@/components/ui';
import { LoadingState } from '@/components/ux/LoadingState';
import { ServerAlertMessage } from '@/components/ux/ServerAlerts';

import { useRootConfig } from '../EBComponentsProvider/RootConfigProvider';
import { useError } from './context/error.context';
import { FormProvider } from './context/formProvider.context';
// import { useIPAddress } from './hooks/getIPAddress';
import NavigationButtons from './Stepper/NavigationButtons';
import { useStepper } from './Stepper/Stepper';
import StepperHeader from './Stepper/StepperHeader';
import { fromApiToForm } from './utils/fromApiToForm';
import { useContentData } from './utils/useContentData';
import { ClientStateStep } from './WizardSteps/ClientStateStep/ClientStateStep';
import { createYupSchema } from './WizardSteps/utils/createYupSchema';
import { getOrgDetails } from './WizardSteps/utils/getOrgDetails';

export const OnboardingWizardSchema = ({ title, currentStep }: any) => {
  const { clientId } = useRootConfig();
  const {
    activeStep,
    stepsList,
    setCurrentStep,
    buildStepper,
    CurrentStep,
    currentFormSchema,
  } = useStepper();

  const { error: isError, refetch, setError } = useError();
  const {
    data: clientData,
    isError: clientIsError,
    error,
    isLoading,
    refetch: refetchClient,
  } = useSmbdoGetClient(clientId ?? '', {
    query: {
      enabled: !!clientId,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  });

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  const clientDataForm = useMemo(() => {
    return clientData && fromApiToForm(clientData);
  }, [clientData]);

  // TODO: IMPROVE STEPPER, when logic dictates for more robust STEP
  useEffect(() => {
    if (clientId && clientDataForm) {
      const orgDetails = getOrgDetails(clientDataForm);
      const steps = [
        'Individual',
        'Organization',
        //
        ...[
          orgDetails?.organizationType !== 'SOLE_PROPRIETORSHIP'
            ? ['Business Owners']
            : [],
        ],
        'Questions',
        'Review',
        'Attestation',
      ].flat();

      buildStepper(steps);
    } else {
      buildStepper();
    }
  }, [clientId, clientDataForm]);

  useEffect(() => {
    if (currentStep && Number.isInteger(currentStep)) {
      setCurrentStep(currentStep);
    }
  }, [currentStep]);

  const { getContentToken } = useContentData(
    `schema.${CurrentStep?.contentData ?? ''}`
  );

  const validationSchema = currentFormSchema?.form
    ? createYupSchema({
        formSchema: currentFormSchema.form,
        getContentToken,
      })
    : ({} as any);

  useEffect(() => {
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: boolean;
    }) => {
      event.preventDefault();
      // Included for legacy support, e.g. Chrome/Edge < 119
      event.returnValue = true;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <Card className="eb-component eb-flex eb-flex-col eb-flex-wrap eb-overflow-clip">
              <Toaster swipeDirection="right" />
              {title?.length > 0 && (
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
              )}
              {isLoading ? (
                <>
                  <LoadingState message="Fetching client data..." />
                </>
              ) : isError || clientIsError ? (
                <>
                  <ServerAlertMessage
                    tryAgainAction={refetchClient || refetch}
                  />
                </>
              ) : (
                <>
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary, error: err }) => (
                      <>
                        <Text>
                          {/* TODO: should it be tokenized? */}
                          There was an error while trying to load this page.
                        </Text>
                        <Text className="eb-text-gray-600" size="lg">
                          {err.name}
                        </Text>
                        <Text className="eb-text-red-600">{err.message}</Text>
                        <Button onClick={() => resetErrorBoundary()}>
                          Try again
                        </Button>
                      </>
                    )}
                  >
                    {clientData?.status === 'NEW' || !clientData ? (
                      <>
                        {!!stepsList?.length &&
                          (activeStep !== 0 || clientId) && (
                            <StepperHeader
                              activeStep={activeStep}
                              setCurrentStep={setCurrentStep}
                              steps={stepsList?.map((step: any) => step?.title)}
                              key={stepsList?.length}
                            ></StepperHeader>
                          )}

                        {(isError || clientIsError) && (
                          <ServerAlertMessage
                            tryAgainAction={refetchClient || refetch}
                          />
                        )}

                        <CardContent>
                          <Box className="eb-flex eb-items-center eb-space-x-4 eb-rounded-md eb-border eb-p-5">
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
                      </>
                    ) : (
                      <ClientStateStep />
                    )}
                  </ErrorBoundary>
                </>
              )}
            </Card>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};
