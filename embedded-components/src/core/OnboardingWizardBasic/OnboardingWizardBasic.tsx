import { FC } from 'react';
import { Loader2Icon } from 'lucide-react';

import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Step, Stepper } from '@/components/ui/stepper';
import { Text } from '@/components/ui/text';

import { InitialForm } from './InitialForm/InitialForm';
import { OnboardingContextProvider } from './OnboardingContextProvider/OnboardingContextProvider';
import { OrganizationStepForm } from './OrganizationStepForm/OrganizationStepForm';
import { ServerErrorAlert } from './ServerErrorAlert/ServerErrorAlert';

const steps = [
  { label: 'Organization details', children: <OrganizationStepForm /> },
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
        <CardContent className="eb-flex eb-w-full eb-flex-col eb-gap-4">
          {!clientId && (
            <>
              <CardDescription>
                It looks like you don&apos;t have a client ID yet. Fill out the
                below to get started!
              </CardDescription>
              <InitialForm />
            </>
          )}
          {!!clientId &&
            (clientGetStatus === 'pending' ? (
              <div className="eb-flex eb-h-32 eb-items-center eb-justify-center">
                <Loader2Icon
                  className="eb-mr-2 eb-animate-spin eb-stroke-primary"
                  size={32}
                />
                <Text className="eb-text-lg">Retrieving client data...</Text>
              </div>
            ) : clientGetStatus === 'error' ? (
              <ServerErrorAlert
                error={clientGetError}
                tryAgainAction={refetchClient}
                customErrorMessage={{
                  default: 'An error occurred while fetching client data.',
                  '404':
                    'Client not found. Please contact support or try again later.',
                }}
              />
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
            ))}
        </CardContent>
      </Card>
    </OnboardingContextProvider>
  );
};
