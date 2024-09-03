import { useEffect, useMemo } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

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
import { useGetDataByClientId } from './WizardSteps/hooks';
import { createYupSchema } from './WizardSteps/utils/createYupSchema';
import { getOrgDetails } from './WizardSteps/utils/getOrgDetails';

export const OnboardingWizardSchema = ({ title }: any) => {
  const { clientId } = useRootConfig();
  const {
    activeStep,
    stepsList,
    setCurrentStep,
    buildStepper,
    CurrentStep,
    currentFormSchema,
  } = useStepper();

  const { data: clientData, isPending: isPendingClient } =
    useGetDataByClientId();
  const clientDataForm = useMemo(() => {
    return clientData && fromApiToForm(clientData);
  }, [clientData]);

  const { error: isError } = useError();

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
              <Toaster swipeDirection="right" />
              {title?.length > 0 && (
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
              )}
              {!!clientId && isPendingClient ? (
                <>
                  <LoadingState message="Fetching client data..." />
                </>
              ) : (
                <>
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

                        {isError && <ServerAlertMessage />}

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
