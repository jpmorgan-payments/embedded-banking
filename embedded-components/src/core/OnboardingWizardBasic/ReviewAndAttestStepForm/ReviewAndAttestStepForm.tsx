import { get } from 'lodash';
import { toast } from 'sonner';

import {
  useSmbdoGetClient,
  useSmbdoListQuestions,
  useSmbdoPostClientVerifications,
  useSmbdoUpdateClient,
} from '@/api/generated/embedded-banking';
import {
  PartyResponse,
  UpdateClientRequestSmbdo,
} from '@/api/generated/embedded-banking.schemas';
import { useStepper } from '@/components/ui/stepper';
import { Button, Group, Stack, Title } from '@/components/ui';

import { useOnboardingContext } from '../OnboardingContextProvider/OnboardingContextProvider';
import { ServerErrorAlert } from '../ServerErrorAlert/ServerErrorAlert';
import OutstandingKYCRequirements from './OustandingKYCRequirements';
import { individualFields, organizationFields } from './partyFields';

interface ClientResponseOutstanding {
  [key: string]: any[];
}

const isOutstandingEmpty = (
  outstanding: ClientResponseOutstanding | undefined
): boolean => {
  if (!outstanding || typeof outstanding !== 'object') {
    return false;
  }

  return Object.keys(outstanding).every(
    (key) => Array.isArray(outstanding[key]) && outstanding[key].length === 0
  );
};

export const ReviewAndAttestStepForm = () => {
  const { nextStep, prevStep, isDisabledStep } = useStepper();
  const { clientId } = useOnboardingContext();

  // Fetch client data
  const { data: clientData } = useSmbdoGetClient(clientId ?? '');

  //Update client attestation
  const { mutateAsync: updateClient, error: updateClientError } =
    useSmbdoUpdateClient({
      mutation: {
        onSettled: () => {
          toast.success('Attestation details updated successfully');
        },
        onSuccess: () => {
          toast.success('Attestation details updated successfully');
          nextStep();
        },
        onError: () => {
          toast.error('Failed to update attestation details');
        },
      },
    });

  // Initiate KYC
  const { mutateAsync: initiateKYC, error: clientVerificationsError } =
    useSmbdoPostClientVerifications({
      mutation: {
        onSettled: () => {
          toast.success('KYC initiated successfully');
        },
        onSuccess: () => {
          toast.success('KYC initiated successfully');
        },
        onError: () => {
          toast.error('Failed to initiate KYC');
        },
      },
    });

  const { data: questionsDetails } = useSmbdoListQuestions({
    questionIds: clientData?.questionResponses
      ?.map((r) => r.questionId)
      .join(','),
  });

  const onCompleteKYCHandler = async () => {
    if (clientId) {
      const requestBody = {
        addAttestations: {
          ...clientData?.attestations?.concat({
            attestationTime: new Date().toISOString(),
            attesterFullName: clientData?.parties?.find(
              (party) => party.partyType === 'INDIVIDUAL'
            )?.individualDetails?.firstName,
            ipAddress: '', // TODO: get IP address
            documentId: '', // TODO: get document id
          }),
        },
      } as UpdateClientRequestSmbdo;

      await updateClient({
        id: clientId,
        data: requestBody,
      });

      await initiateKYC({ id: clientId });
    }
  };

  const renderParty = (
    party: PartyResponse,
    fields: { label: any; path: any }[]
  ) => (
    <div key={party.id + (party?.partyType ?? '')} className="eb-mb-4 eb-p-4">
      <h2 className="eb-mb-4 eb-text-xl eb-font-bold">{party.partyType}</h2>
      <dl className="eb-ml-2 eb-space-y-2">
        {fields.map(({ label, path }) => {
          const value = get(party, path);
          if (value !== undefined && value !== null) {
            return (
              <div
                key={path}
                className="eb-flex eb-border-b eb-border-dotted eb-border-gray-300 sm:eb-justify-between"
              >
                <dt className="eb-w-1/3 sm:eb-mb-0">{label}:</dt>
                <dd className="sm:eb-w-2/3 sm:eb-pl-4">
                  {typeof value === 'boolean'
                    ? value.toString()
                    : Array.isArray(value)
                      ? value.join(', ')
                      : value}
                </dd>
              </div>
            );
          }
          return null;
        })}
      </dl>
    </div>
  );

  return (
    <>
      <Stack className="eb-w-full eb-text-sm">
        <Title as="h2">Review</Title>
        <Group className="eb-my-4">
          <Title as="h5">STATUS: &nbsp;</Title>
          <Title as="h5" className="eb-text-green-500">
            {clientData?.status}
          </Title>
        </Group>
        {!isOutstandingEmpty(clientData?.outstanding) && clientData && (
          <OutstandingKYCRequirements clientData={clientData} />
        )}
        <div className="eb-w-xl eb-px-4">
          {clientData?.parties?.map((party) =>
            party.partyType === 'ORGANIZATION'
              ? renderParty(party, organizationFields)
              : renderParty(party, individualFields)
          )}
        </div>

        {!!clientData?.questionResponses?.length && (
          <>
            <h2 className="eb-mb-4 eb-text-xl eb-font-bold">
              Question Responses
            </h2>
            {clientData?.questionResponses?.map((questionResponse) => (
              <div
                key={questionResponse.questionId}
                className="eb-mb-4 eb-border-b eb-border-dotted eb-border-gray-300 eb-p-4"
              >
                <dl className="eb-ml-2 eb-space-y-2">
                  <dt className="eb-w-1/3 sm:eb-mb-0">
                    {
                      questionsDetails?.questions?.find(
                        (q) => q.id === questionResponse.questionId
                      )?.description
                    }
                  </dt>
                  <dd className="sm:eb-w-2/3sm:eb-pl-4">
                    <b>Response:</b> {questionResponse?.values?.join(', ')}
                  </dd>
                </dl>
              </div>
            ))}
          </>
        )}
        <ServerErrorAlert
          error={updateClientError || clientVerificationsError}
        />
        <div className="eb-flex eb-w-full eb-justify-end eb-gap-4">
          <Button
            disabled={isDisabledStep}
            variant="secondary"
            onClick={prevStep}
          >
            Previous
          </Button>
          <Button onClick={onCompleteKYCHandler}>Next</Button>
        </div>
      </Stack>
    </>
  );
};
