import { useCallback, useEffect, useMemo } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Button, Text } from '@/components/ui';

import { useRootConfig } from '../EBComponentsProvider/RootConfigProvider';
import { useOnboardingForm } from './context/form.context';
import { FormProvider } from './context/formProvider.contex';
import { useIPAddress } from './hooks/getIPAddress';
import { businessDetailsMock, controllerMock } from './mocks/reviewStep.mock';
import NavigationButtons from './Stepper/NavigationButtons';
import { useStepper } from './Stepper/useStepper';
import { createYupSchema } from './Steps_/utils/createYupSchema';
import { useContentData } from './utils/useContentData';

export const OnboardingWizardSchema = ({ title, schema, ...props }: any) => {
  const {
    activeStep,
    setCurrentStep,
    buildStepper,
    CurrentStep,
    currentSchema,
    ...rest
  } = useStepper();
  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  const { data: ipAddress, status: ipFetchStatus } = useIPAddress();
  const { clientId, jurisdictions, products } = useRootConfig();
  console.log('@@IPs', ipAddress, jurisdictions, products, clientId);
  // const actualSchema = schema || StepsSchema;

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

  //TODO: Turn all the below effects, and Memoes into a hook
  useEffect(() => {
    if (ipAddress) {
      setOnboardingForm({ ...onboardingForm, ip: ipAddress });
    }
  }, [ipAddress]);

  useEffect(() => {
    if (clientId) {
      console.log('@@clientID', clientId);
    }
  }, [clientId]);

  // const { currentSchema, CurrentStep } = buildStepper(clientId);

  useEffect(() => {
    buildStepper(clientId);
  }, [clientId]);

  const { getContentToken } = useContentData(
    `schema.${CurrentStep?.contentData ?? ''}`
  );

  const validationSchema = currentSchema?.form
    ? createYupSchema({
        formSchema: currentSchema.form,
        getContentToken,
      })
    : ({} as any);
  console.log('@@CurrentStep', CurrentStep, currentSchema, rest, activeStep);

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <Card className="eb-flex eb-flex-col eb-flex-wrap eb-overflow-clip">
              <CardHeader>
                <CardTitle>{title || 'Onboarding Wizards'}</CardTitle>
              </CardHeader>
              {/* {(activeStep !== 0 || clientId) && (
                <StepperHeader
                  activeStep={activeStep}
                  setCurrentStep={setCurrentStep}
                  steps={steps.map((step) => step.type.title)}
                ></StepperHeader>
              )} */}

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
                            formSchema: currentSchema,
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
