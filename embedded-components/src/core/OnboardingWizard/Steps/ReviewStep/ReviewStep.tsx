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
  Stack,
  Text,
  Title,
} from '@/components/ui';

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

const ReviewStep = ({ activeStep, setActiveStep }: ReviewStepProps) => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken } = useContentData('steps.ReviewStep');
  const { data } = useSmbdoGetClient(onboardingForm.id);
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

  // TODO: personal information requires the controllerKEY name
  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);


  return (
    <>
      <Stack>
        <Title as="h2">Review</Title>
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

export { ReviewStep };
