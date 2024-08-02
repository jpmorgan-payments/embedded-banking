import { FC } from 'react';
import { AlertCircle, Loader2Icon, RefreshCwIcon } from 'lucide-react';

import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Step, Stepper } from '@/components/ui/stepper';
import { Button, Text } from '@/components/ui';

import { InitialStepForm } from './InitialStepForm/InitialStepForm';
import { OnboardingContextProvider } from './OnboardingContextProvider/OnboardingContextProvider';

const steps = [
  { label: 'Initial step', children: <InitialStepForm /> },
  { label: 'Individual details', children: <div>WIP</div> },
];

type OnboardingWizardBasicProps = {
  clientId?: string;
};

export const OnboardingWizardBasic: FC<OnboardingWizardBasicProps> = ({
  clientId,
}) => {
  const {
    status: clientGetStatus,
    error: clientGetError,
    refetch: refetchClient,
  } = useSmbdoGetClient(clientId ?? '', {
    query: {
      enabled: !!clientId,
    },
  });

  return (
    <OnboardingContextProvider clientId={clientId}>
      <Card className="eb-component">
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="eb-flex eb-w-full eb-flex-col eb-gap-4">
            {clientGetStatus === 'pending' ? (
              <div className="eb-flex eb-h-32 eb-items-center eb-justify-center">
                <Loader2Icon
                  className="eb-mr-2 eb-animate-spin eb-stroke-primary"
                  size={32}
                />
                <Text className="eb-text-lg">Retrieving client data...</Text>
              </div>
            ) : clientGetStatus === 'error' ? (
              <Alert variant="destructive">
                <AlertCircle className="eb-h-4 eb-w-4" />
                <AlertTitle>
                  {clientGetError?.response?.data?.title ??
                    clientGetError?.message}
                </AlertTitle>
                <AlertDescription>
                  An unexpected error occurred. Please try again later.
                </AlertDescription>
                <AlertDescription className="eb-mt-2">
                  <Button size="sm" onClick={() => refetchClient()}>
                    <RefreshCwIcon className="eb-mr-1 eb-h-4 eb-w-4" />
                    Try again
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <Stepper variant="circle" initialStep={0} steps={steps}>
                {steps.map((stepProps, index) => {
                  const { children, ...rest } = stepProps;
                  return (
                    <Step key={index} {...rest}>
                      <div className="eb-px-1">{children}</div>
                    </Step>
                  );
                })}
              </Stepper>
            )}
          </div>
        </CardContent>
      </Card>
    </OnboardingContextProvider>
  );
};
