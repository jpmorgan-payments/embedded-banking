import { useEffect, useMemo } from 'react';

import {
  IndividualDetails,
  OrganizationDetails,
} from '@/api/generated/embedded-banking.schemas';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Group, Stack, Title } from '@/components/ui';

import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useGetDataByClientId } from '../hooks';
// import { useContentData } from '../../utils/useContentData';
import { reviewSchema } from '../StepsSchema';

const LabelValueTable = ({
  data,
}: {
  data: Array<{ label: string; value?: string }>;
}) => {
  return (
    <dl className="eb-grid eb-gap-3">
      {data.map(({ label, value }) => (
        <div key={label} className="eb-flex eb-items-center eb-justify-between">
          <dt className="eb-text-muted-foreground">{label}</dt>
          <dd>{value ?? '--'}</dd>
        </div>
      ))}
    </dl>
  );
};

const ReviewStep = () => {
  // const { getContentToken } = useContentData('steps.ReviewStep');

  const { setCurrentStep, buildStepper, activeStep } = useStepper();

  const { data, isPending } = useGetDataByClientId('client');

  // STEP BUILDER, setOnboarding Form is not required
  useEffect(() => {
    if (data?.outstanding?.questionIds?.length) {
      buildStepper(['Review', 'Questions']);
    }
    if (data?.outstanding?.attestationDocumentIds?.length) {
      buildStepper(['Attestation']);
    }
  }, [data]);

  // TODO: personal information requires the controllerKEY name
  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const individualDetailsArray = [];

  for (const [, value] of Object.entries(reviewData?.individualDetails ?? {})) {
    individualDetailsArray.push(value);
  }
  const individualDetails: IndividualDetails = (
    individualDetailsArray?.[0] as { indDetails: IndividualDetails }
  )?.indDetails;

  const organizationDetailsArray = [];

  for (const [, value] of Object.entries(
    reviewData?.organizationDetails ?? {}
  )) {
    organizationDetailsArray.push(value);
  }
  const organizationDetails: OrganizationDetails = (
    organizationDetailsArray?.[0] as { orgDetails: OrganizationDetails }
  )?.orgDetails;

  return (
    <>
      <Stack className="eb-w-full">
        <Title as="h2">Review</Title>
        <Group>
          <Title as="h5">STATUS: &nbsp;</Title>
          <Title as="h5" className="eb-text-green-500">
            {reviewData?.status}
          </Title>
        </Group>
        <div className="eb-w-[28rem] eb-border eb-px-4">
          <Accordion
            type="multiple"
            className="eb-w-full"
            defaultValue={['individual-details']}
          >
            <AccordionItem value="individual-details">
              <AccordionTrigger className="eb-uppercase">
                Individual Details
              </AccordionTrigger>
              <AccordionContent>
                <LabelValueTable
                  data={[
                    {
                      label: 'First name',
                      value: individualDetails?.firstName,
                    },
                    {
                      label: 'Last name',
                      value: individualDetails?.lastName,
                    },
                    {
                      label: 'Date of birth',
                      value: individualDetails?.birthDate,
                    },
                    {
                      label: 'Email',
                      // @ts-ignore
                      value: individualDetailsArray?.[0]?.email,
                    },
                    {
                      label: 'Phone',
                      value: individualDetails?.phone?.phoneNumber,
                    },
                    {
                      label: 'Job title',
                      value: individualDetails?.jobTitle,
                    },
                    {
                      label: 'Job title description',
                      value: individualDetails?.jobTitleDescription,
                    },
                    {
                      label: 'Nature of ownership',
                      value:
                        typeof individualDetails?.natureOfOwnership ===
                        'undefined'
                          ? undefined
                          : individualDetails?.natureOfOwnership
                            ? 'Yes'
                            : 'No',
                    },
                    {
                      label: 'Sole owner?',
                      value:
                        typeof individualDetails?.soleOwner === 'undefined'
                          ? undefined
                          : individualDetails?.soleOwner
                            ? 'Yes'
                            : 'No',
                    },
                    {
                      label: 'Country of Residence',
                      value: individualDetails?.countryOfResidence,
                    },
                    {
                      label: 'Address Line 1',
                      value:
                        individualDetails?.addresses?.[0]?.addressLines?.[0],
                    },
                    {
                      label: 'Address Line 2',
                      value:
                        individualDetails?.addresses?.[0]?.addressLines?.[1],
                    },
                    {
                      label: 'Address Line 3',
                      value:
                        individualDetails?.addresses?.[0]?.addressLines?.[3],
                    },
                    {
                      label: 'City',
                      value: individualDetails?.addresses?.[0]?.city,
                    },
                    {
                      label: 'State',
                      value: individualDetails?.addresses?.[0]?.state,
                    },
                    {
                      label: 'Postal code',
                      value: individualDetails?.addresses?.[0]?.postalCode,
                    },
                  ]}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="organization-details">
              <AccordionTrigger className="eb-uppercase">
                Organization Details
              </AccordionTrigger>
              <AccordionContent>
                <LabelValueTable
                  data={[
                    {
                      label: 'Organization name',
                      value: organizationDetails?.organizationName,
                    },
                    {
                      label: 'Doing business as',
                      value: organizationDetails?.dbaName,
                    },
                    {
                      label: 'Organization type',
                      value: organizationDetails?.organizationType,
                    },
                    {
                      label: 'Organization description',
                      value: organizationDetails?.organizationDescription,
                    },
                    {
                      label: 'Email',
                      // @ts-ignore
                      value: organizationDetailsArray?.[0]?.email,
                    },
                    {
                      label: 'Website',
                      value: organizationDetails?.website,
                    },
                    {
                      label: 'Industry category',
                      value: organizationDetails?.industryCategory,
                    },
                    {
                      label: 'Industry type',
                      value: organizationDetails?.industryType,
                    },
                    {
                      label: 'Country of formation',
                      value: organizationDetails?.countryOfFormation,
                    },
                    {
                      label: 'Jurisdiction',
                      value: organizationDetails?.jurisdiction,
                    },
                    {
                      label: 'Business phone',
                      value: organizationDetails?.phone?.phoneNumber,
                    },
                    {
                      label: 'Entities in ownership?',
                      value:
                        typeof organizationDetails?.entitiesInOwnership ===
                        'undefined'
                          ? undefined
                          : organizationDetails?.entitiesInOwnership
                            ? 'Yes'
                            : 'No',
                    },
                    {
                      label: 'Significant ownership?',
                      value:
                        typeof organizationDetails?.significantOwnership ===
                        'undefined'
                          ? undefined
                          : organizationDetails?.significantOwnership
                            ? 'Yes'
                            : 'No',
                    },
                    {
                      label: 'Trade over internet?',
                      value:
                        typeof organizationDetails?.tradeOverInternet ===
                        'undefined'
                          ? undefined
                          : organizationDetails?.tradeOverInternet
                            ? 'Yes'
                            : 'No',
                    },
                  ]}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

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
