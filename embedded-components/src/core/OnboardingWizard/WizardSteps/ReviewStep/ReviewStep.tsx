import { get } from 'lodash';

import { useSmbdoListQuestions } from '@/api/generated/embedded-banking';
import { PartyResponse } from '@/api/generated/embedded-banking.schemas';
import { Group, Stack, Title } from '@/components/ui';

import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
import { useGetDataByClientId } from '../hooks';
import { reviewSchema } from '../StepsSchema';
import OutstandingKYCRequirements from './OustandingKYCRequirements';
import { individualFields, organizationFields } from './partyFields';

const isOutstandingEmpty = (outstanding: { [x: string]: string | any[] }) => {
  if (!outstanding || typeof outstanding !== 'object') {
    return false;
  }

  return Object.keys(outstanding).every(
    (key) => Array.isArray(outstanding[key]) && outstanding[key].length === 0
  );
};

const ReviewStep = () => {
  // const { getContentToken } = useContentData('steps.ReviewStep');

  const { setCurrentStep, activeStep } = useStepper();

  const { data: clientData, isPending }: any = useGetDataByClientId('client');

  const { data: questionsDetails } = useSmbdoListQuestions({
    questionIds: clientData?.questionResponses
      ?.map((r: any) => r.questionId)
      .join(','),
  });

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
        {!isOutstandingEmpty(clientData?.outstanding) && (
          <OutstandingKYCRequirements clientData={clientData} />
        )}
        <div className="eb-w-xl eb-px-4">
          {clientData?.parties?.map((party: any) =>
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
            {clientData?.questionResponses?.map((questionResponse: any) => (
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

        <NavigationButtons
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
          disabled={isPending}
          onSubmit={() => {
            setCurrentStep(activeStep + 1);
          }}
        />
      </Stack>
    </>
  );
};

ReviewStep.title = 'Review';
ReviewStep.validationSchema = reviewSchema;

export { ReviewStep };
