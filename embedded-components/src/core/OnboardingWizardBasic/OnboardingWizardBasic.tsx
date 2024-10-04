import { FC, useEffect, useState } from 'react';

import { useSmbdoGetClient } from '@/api/generated/smbdo';
import {
  ApiError,
  ClientProductList,
  ClientResponse,
  ClientVerificationResponse,
} from '@/api/generated/smbdo.schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Step, Stepper } from '@/components/ui/stepper';

import { AdditionalQuestionsStepForm } from './AdditionalQuestionsStepForm/AdditionalQuestionsStepForm';
import { BusinessOwnerStepForm } from './BusinessOwnerStepForm/BusinessOwnerStepForm';
import { ClientOnboardingStateView } from './ClientOnboardingStateView/ClientOnboardingStateView';
import { DecisionMakerStepForm } from './DecisionMakerStepForm/DecisionMakerStepForm';
import { DocumentUploadStepForm } from './DocumentUploadStepForm/DocumentUploadStepForm';
import { FormLoadingState } from './FormLoadingState/FormLoadingState';
import { IndividualStepForm } from './IndividualStepForm/IndividualStepForm';
import { InitialForm } from './InitialForm/InitialForm';
import { OnboardingContextProvider } from './OnboardingContextProvider/OnboardingContextProvider';
import { OrganizationStepForm } from './OrganizationStepForm/OrganizationStepForm';
import { ReviewAndAttestStepForm } from './ReviewAndAttestStepForm/ReviewAndAttestStepForm';
import { ServerErrorAlert } from './ServerErrorAlert/ServerErrorAlert';

const stepsInitial = [
  { label: 'Organization details', children: <OrganizationStepForm /> },
  { label: 'Individual details', children: <IndividualStepForm /> },
  {
    label: 'Decision Makers',
    children: <DecisionMakerStepForm />,
    onlyVisibleFor: {
      organizationType: ['LIMITED_LIABILITY_COMPANY'],
      product: ['MERCHANT_SERVICES'] as ClientProductList,
    },
  },
  {
    label: 'Business Owners',
    children: <BusinessOwnerStepForm />,
    onlyVisibleFor: {
      organizationType: ['LIMITED_LIABILITY_COMPANY'],
      product: ['EMBEDDED_PAYMENTS', 'MERCHANT_SERVICES'] as ClientProductList,
    },
  },
  { label: 'Additional Questions', children: <AdditionalQuestionsStepForm /> },
  { label: 'Review and Attest', children: <ReviewAndAttestStepForm /> },
];

const stepsCanadaMS = [
  { label: 'Organization details', children: <OrganizationStepForm /> },
  { label: 'Individual details', children: <IndividualStepForm /> },
  {
    label: 'Decision Makers',
    children: <DecisionMakerStepForm />,
    onlyVisibleFor: {
      organizationType: ['LIMITED_LIABILITY_COMPANY'],
      product: ['MERCHANT_SERVICES'] as ClientProductList,
    },
  },
  {
    label: 'Business Owners',
    children: <BusinessOwnerStepForm />,
    onlyVisibleFor: {
      organizationType: ['LIMITED_LIABILITY_COMPANY'],
      product: ['EMBEDDED_PAYMENTS', 'MERCHANT_SERVICES'] as ClientProductList,
    },
  },
  { label: 'Additional Questions', children: <AdditionalQuestionsStepForm /> },
  { label: 'Review and Attest', children: <ReviewAndAttestStepForm /> },
  { label: 'Upload Documents', children: <DocumentUploadStepForm /> },
];

interface StepProps {
  label: string;
  children: React.ReactNode;
  onlyVisibleFor?: { product?: string[]; organizationType?: string[] };
}

export type OnboardingWizardBasicProps = {
  clientId?: string;
  title?: string;
  setClientId?: (clientId: string) => void;
  onPostClientResponse?: (response?: ClientResponse, error?: ApiError) => void;
  onPostClientVerificationsResponse?: (
    response?: ClientVerificationResponse,
    error?: ApiError
  ) => void;
  initialStep?: number;
  variant?: 'circle' | 'circle-alt' | 'line';
  useCase?: 'EF' | 'CanadaMS';
};

export const OnboardingWizardBasic: FC<OnboardingWizardBasicProps> = ({
  title = 'Client Onboarding',
  initialStep = 0,
  variant = 'circle',
  useCase = 'EF',
  ...props
}) => {
  const stepsToUse = useCase === 'EF' ? stepsInitial : stepsCanadaMS;

  const {
    data: clientData,
    status: clientGetStatus,
    error: clientGetError,
    refetch: refetchClient,
  } = useSmbdoGetClient(props.clientId ?? '', {
    query: {
      enabled: !!props.clientId,
    },
  });

  const [steps, setSteps] = useState<StepProps[]>([]);

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

  useEffect(() => {
    setSteps(
      stepsToUse.filter(
        (step) =>
          !step.onlyVisibleFor ||
          (step.onlyVisibleFor?.organizationType.some(
            (orgType) =>
              clientData?.parties?.find(
                (party) => party.partyType === 'ORGANIZATION'
              )?.organizationDetails?.organizationType === orgType
          ) &&
            step.onlyVisibleFor?.product.some((product) =>
              clientData?.products.includes(product)
            ))
      )
    );
  }, [clientData, stepsToUse]);

  return (
    <OnboardingContextProvider {...props}>
      <Card className="eb-component">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="eb-flex eb-w-full eb-flex-col eb-gap-4">
          {!props.clientId && (
            <>
              <CardDescription>
                It looks like you don&apos;t have a client ID yet. Fill out the
                below to get started!
              </CardDescription>
              <InitialForm />
            </>
          )}
          {!!props.clientId &&
            (clientGetStatus === 'pending' ? (
              <FormLoadingState message="Fetching client data..." />
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
            ) : clientData?.status === 'NEW' ? (
              <Stepper
                initialStep={initialStep}
                steps={steps}
                variant={variant}
                mobileBreakpoint="1279px"
              >
                {steps.map((stepProps, index) => {
                  const { children, ...rest } = stepProps;
                  return (
                    <Step key={index} {...rest}>
                      <div className="eb-px-1">{children}</div>
                    </Step>
                  );
                })}
              </Stepper>
            ) : (
              <ClientOnboardingStateView />
            ))}
        </CardContent>
      </Card>
    </OnboardingContextProvider>
  );
};
