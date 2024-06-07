import { useEffect, useMemo, useState } from 'react';

import {
  getSmbdoPostClientVerificationsMutationOptions,
  smbdoGetClient,
  smbdoPostClientVerifications,
  useSmbdoGetClient,
} from '@/api/generated/embedded-banking';
import {
  Button,
  Dialog,
  DialogTrigger,
  Group,
  Stack,
  Text,
  Title,
} from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { CardReviewBusiness } from '../../CardReview/CardReviewBusiness';
import { CardReviewIndividual } from '../../CardReview/CardReviewIndividual';
import { useOnboardingForm } from '../../context/form.context';
import {
  businessDetailsMock,
  controllerMock,
  formCompleteMock,
} from '../../mocks/reviewStep.mock';
import { BusinessDetailsModal } from '../../Modals/BusinessDetailsModal';
import { IndividualDetailsModal } from '../../Modals/IndividualDetailsModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { fromApiToForm } from '../../utils/fromApitoForm';
import { useContentData } from '../../utils/useContentData';
import { ReviewTable } from './ReviewTable';
import { valuesMap } from './valuesMap';

type ReviewStepProps = {
  setActiveStep: any;
  activeStep: number;
};
const parties = [
  {
    id: '2000000111',
    partyType: 'ORGANIZATION',
    externalId: 'TCU1234',
    email: 'monica@cpgetaways.com',
    roles: ['CLIENT'],
    profileStatus: 'APPROVED',
    status: 'ACTIVE',
    createdAt: '2024-06-07T14:39:15.253Z',
    organizationDetails: {
      organizationType: 'SOLE_PROPRIETORSHIP',
      organizationName: 'Central Park Getaways',
      dbaName: 'CP Getaways',
      organizationDescription:
        'Relax, unwind and experience the comforting charm of our apartment while exploring New York',
      industryCategory: 'Accommodation and Food Services',
      industryType: 'All Other Traveler Accommodation',
      countryOfFormation: 'US',
      yearOfFormation: '2023',
      significantOwnership: true,
      entitiesInOwnership: false,
      addresses: [
        {
          addressType: 'BUSINESS_ADDRESS',
          addressLines: ['90 Bedford Street', 'Apt 2E'],
          city: 'New York',
          state: 'NY',
          postalCode: '10014',
          country: 'US',
        },
      ],
      phone: {
        phoneType: 'BUSINESS_PHONE',
        countryCode: 'US',
        phoneNumber: '6316215110',
      },
      organizationIds: [
        {
          idType: 'EIN',
          issuer: 'US',
          value: '00-0000001',
        },
      ],
      websiteAvailable: false,
    },
  },
  {
    id: '2000000112',
    partyType: 'INDIVIDUAL',
    parentPartyId: '2000000111',
    parentExternalId: 'TCU1234',
    externalId: 'TCU12344',
    email: 'monica@cpgetaways.com',
    profileStatus: 'APPROVED',
    status: 'ACTIVE',
    createdAt: '2024-06-07T14:39:15.253Z',
    roles: ['CONTROLLER', 'BENEFICIAL_OWNER'],
    individualDetails: {
      firstName: 'Monica',
      lastName: 'Gellar',
      countryOfResidence: 'US',
      natureOfOwnership: 'Direct',
      jobTitle: 'Other',
      jobTitleDescription: 'CEO',
      soleOwner: true,
      addresses: [
        {
          addressType: 'RESIDENTIAL_ADDRESS',
          addressLines: ['90 Bedford Street', 'Apt 2E'],
          city: 'New York',
          state: 'NY',
          postalCode: '10014',
          country: 'US',
        },
      ],
      individualIds: [
        {
          idType: 'SSN',
          issuer: 'US',
          value: '100-01-0001',
        },
      ],
    },
  },
];
const ReviewStep = ({ activeStep, setActiveStep }: ReviewStepProps) => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken } = useContentData('steps.ReviewStep');
  const { clientId } = useRootConfig();
  const { data } = useSmbdoGetClient(
    (onboardingForm?.id || clientId) as string
  );

  // TODO: remove once the API is fixed
  if (data) {
    //@ts-ignore
    data.parties = parties;
  }
  const [edit, onEditBusiness] = useState(false);
  const [editIndividual, onEditIndividual] = useState(false);
  const [indData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);
  // const { getContentToken: getValueMap }: any =
  //   useContentData('steps.valuesMap');

  // const [data, setData] = useState(
  //   onboardingForm?.legalStructure || {
  //     businessDetails: businessDetailsMock,
  //     controller: controllerMock,
  //     id: '1000010400',
  //     legalStructure: undefined,
  //     decisionMakers: undefined,
  //     outstandingItems: {
  //       attestationDocumentIds: Array(1),
  //       documentRequestIds: Array(0),
  //       partyIds: Array(0),
  //       partyRoles: Array(0),
  //       questionIds: Array(3),
  //     },
  //     owner: controllerMock,
  //   }
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res: any = await smbdoGetClient(onboardingForm.id);
  //       // const resp: any = await smbdoPostClientVerifications('1');
  //       // setData(res);
  //       console.log('@@res', res, '>> \n', fromApiToForm(res));
  //       setData(fromApiToForm(res));
  //     } catch (error) {
  //       // TODO add error handler
  //       console.log('@@Err', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const newSet = {
  //   ...data?.businessDetails,
  //   owners: [{ ...data?.owner }],
  //   decisionMakers: [{ ...data?.owner }],
  // };

  useEffect(() => {
    if (data?.id) {
      setOnboardingForm({
        ...onboardingForm,
        attestations: data.outstanding.attestationDocumentIds || [],
      });
    }
  }, [data]);

  // TODO: personal information requires the controllerKEY name
  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  return (
    <>
      <Stack>
        <Title as="h2">Review</Title>
        <Group>
          <Title as="h5">STATUS: &nbsp;</Title>
          <Title as="h5" className="eb-text-green-500">
            {reviewData?.status}
          </Title>
        </Group>
        {/* {reviewData && reviewData?.organizationDetails} */}
        {reviewData?.organizationDetails && (
          <CardReviewBusiness
            data={reviewData?.organizationDetails}
            title="Business Details"
            type="organization"
            onEdit={onEditBusiness}
          />
        )}
        {reviewData?.individualDetails &&
          Object.keys(reviewData?.individualDetails).map((key: any) => {
            const indDetails = reviewData.individualDetails[key];

            return (
              <CardReviewIndividual
                data={indDetails}
                title="Individual & Managament"
                type="individual"
                onEdit={() => {
                  onEditIndividual(true);
                  setModalData(indDetails);
                }}
                key={indDetails?.id}
              />
            );
          })}
        <Dialog open={edit} onOpenChange={onEditBusiness}>
          {reviewData?.organizationDetails && (
            <BusinessDetailsModal
              formData={reviewData?.organizationDetails}
              onCancel={() => {
                onEditBusiness(false);
              }}
            />
          )}
        </Dialog>
        <Dialog open={editIndividual} onOpenChange={onEditIndividual}>
          {indData && (
            <IndividualDetailsModal
              formData={indData}
              onCancel={() => {
                onEditIndividual(false);
              }}
            />
          )}
        </Dialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <Button
            onClick={() => setOpen(true)}
            type="button"
            variant="outline"
            className="eb-max-w-56"
          >
            <DialogTrigger>Click to add a decision maker</DialogTrigger>
          </Button>
          <IndividualDetailsModal
            onCancel={() => {
              setOpen(false);
            }}
            create
          />
        </Dialog>
        <NavigationButtons
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSubmit={() => {
            setActiveStep(activeStep + 1);
          }}
        />
      </Stack>
    </>
  );
};

ReviewStep.title = 'Review';

export { ReviewStep };
