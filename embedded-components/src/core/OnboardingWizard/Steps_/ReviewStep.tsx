import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  getSmbdoPostClientVerificationsMutationOptions,
  smbdoGetClient,
  smbdoPostClientVerifications,
  useSmbdoGetClient,
  useSmbdoPostClients,
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

import { CardReviewBusiness } from '../CardReview/CardReviewBusiness';
import { CardReviewIndividual } from '../CardReview/CardReviewIndividual';
import { useOnboardingForm } from '../context/form.context';
import { BusinessDetailsModal } from '../Modals/BusinessDetailsModal';
import { IndividualDetailsModal } from '../Modals/IndividualDetailsModal';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useStepper } from '../Stepper/useStepper';
import { fromApiToForm } from '../utils/fromApitoForm';
import { useContentData } from '../utils/useContentData';
import { reviewSchema } from './StepsSchema';

const ReviewStep = () => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const form = useFormContext();
  const {
    setCurrentStep,
    setStepState,
    buildStepper,
    CurrentStep,
    activeStep,
  } = useStepper();
  const { getContentToken } = useContentData('steps.ReviewStep');

  const { clientId, mockSteps, isMockResponse, onRegistration } =
    useRootConfig();
  const { data } = isMockResponse
    ? { data: mockSteps.review }
    : useSmbdoGetClient((clientId || onboardingForm?.id) as string);
  const { mutateAsync: postClient, isPending: isPendingClientPost } =
    useSmbdoPostClients();

  console.log('@@data', data);

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

    if (data?.outstanding?.questionIds?.length) {
      buildStepper(['Review', 'Questions']);
    }
    if (data?.outstanding?.attestationDocumentIds?.length) {
      buildStepper(['Verification']);
    }
  }, [data]);

  // TODO: personal information requires the controllerKEY name
  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;
    console.log('@@ON SUBMIT');

    if (!Object.values(errors).length) {
      // TODO: update this
      // const apiForm = formToAPIBody(form.getValues());
      const {
        organizationName,
        countryOfFormation,
        firstName,
        lastName,
        businessEmail,
        countryOfResidence,
      } = form.getValues();

      try {
        // TODO: RAW, will need to Update this
        // const res = await postClient({
        //   data: {
        //     parties: [
        //       {
        //         partyType: 'ORGANIZATION',
        //         email: businessEmail,
        //         roles: ['CLIENT'],
        //         organizationDetails: {
        //           organizationName,
        //           // TODO: update organization Type
        //           organizationType: 'LIMITED_LIABILITY_COMPANY',
        //           countryOfFormation,
        //         },
        //       },
        //       {
        //         partyType: 'INDIVIDUAL',
        //         email: businessEmail,
        //         roles: ['CONTROLLER'],
        //         individualDetails: {
        //           firstName,
        //           lastName,
        //           countryOfResidence,
        //         },
        //       },
        //     ],
        //     products: ['EMBEDDED_PAYMENTS'],
        //   },
        // });

        // TODO: do we need clone here?
        // const newOnboardingForm = _.cloneDeep(onboardingForm);
        // newOnboardingForm.id = res.id;
        // newOnboardingForm.outstandingItems = res.outstanding;

        if (onRegistration) {
          // onRegistration({ clientId: res.id });
        }

        // setOnboardingForm({
        //   ...onboardingForm,
        //   id: res.id,
        //   outstandingItems: res?.outstanding || [],
        // });
        // setOnboardingForm({
        //   ...newOnboardingForm,
        //   attestations: res.outstanding.attestationDocumentIds || [],
        // });
        setCurrentStep(activeStep + 1);
      } catch (error) {
        console.log(error);
      }
    }
  }, [activeStep]);

  console.log('@@reivewData', reviewData);

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

        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <NavigationButtons
            setActiveStep={setCurrentStep}
            activeStep={activeStep}
            disabled={isPendingClientPost}
            // onSubmit={() => {
            //   setCurrentStep(activeStep + 1);
            // }}
          />
        </form>
      </Stack>
    </>
  );
};

ReviewStep.title = 'Review';
ReviewStep.validationSchema = reviewSchema;

export { ReviewStep };
