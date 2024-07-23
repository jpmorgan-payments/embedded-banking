import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoGetClient } from '@/api/generated/embedded-banking';
import {
  Button,
  Dialog,
  DialogTrigger,
  Group,
  Stack,
  Title,
} from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useOnboardingForm } from '@/core/OnboardingWizard/context/form.context';

import { CardReviewBusiness } from '../../CardReview/CardReviewBusiness';
import { CardReviewIndividual } from '../../CardReview/CardReviewIndividual';
import { BusinessDetailsModal } from '../../Modals/BusinessDetailsModal';
import { IndividualDetailsModal } from '../../Modals/IndividualDetailsModal';
import NavigationButtons from '../../Stepper/NavigationButtons';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
import { fromApiToForm } from '../../utils/fromApiToForm';
import { useGetDataByClientId } from '../hooks';
// import { useContentData } from '../../utils/useContentData';
import { reviewSchema } from '../StepsSchema';

const EditReviewStep = () => {
  // const { getContentToken } = useContentData('steps.EditReviewStep');

  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const form = useFormContext();
  const { setCurrentStep, buildStepper, activeStep } = useStepper();

  const { data, refetch, isPending } = useGetDataByClientId();

  const [edit, onEditBusiness] = useState(false);
  const [editIndividual, onEditIndividual] = useState(false);
  const [indData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);

  // STEP BUILDER, setOnboaring Form is not requried
  useEffect(() => {
    if (data?.id) {
      const reviewData = fromApiToForm(data);
      setOnboardingForm(reviewData);
    }

    if (data?.outstanding?.questionIds?.length) {
      buildStepper(['Review', 'Questions']);
      setOnboardingForm({
        ...onboardingForm,
        questionsIds: data?.outstanding?.questionIds || [],
      });
    }
    if (data?.outstanding?.attestationDocumentIds?.length) {
      buildStepper(['Attestation']);
      setOnboardingForm({
        ...onboardingForm,
        questionsIds: data?.outstanding?.questionIds || [],
      });
    }
  }, [data]);

  // TODO: personal information requires the controllerKEY name
  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      setCurrentStep(activeStep + 1);
    }
  }, [activeStep]);

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
        <Title as="h5" className="eb-my-6 eb-uppercase ">
          Management & Ownership
        </Title>
        <Stack className="eb-gap-4">
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
        </Stack>
        <Dialog open={edit} onOpenChange={onEditBusiness}>
          {reviewData?.organizationDetails && (
            <BusinessDetailsModal
              formData={reviewData?.organizationDetails}
              onCancel={(id: string) => {
                onEditBusiness(false);
                if (id) {
                  refetch();
                }
              }}
            />
          )}
        </Dialog>

        <Dialog open={editIndividual} onOpenChange={onEditIndividual}>
          {indData && (
            <IndividualDetailsModal
              formData={indData}
              onCancel={(id: string) => {
                onEditIndividual(false);
                if (id) {
                  refetch();
                }
              }}
            />
          )}
        </Dialog>

        <Dialog open={open} onOpenChange={setOpen}>
          <Button
            onClick={() => setOpen(true)}
            type="button"
            variant="outline"
            className="eb-mt-4 eb-max-w-56"
          >
            <DialogTrigger>Click to add a decision maker</DialogTrigger>
          </Button>
          <IndividualDetailsModal
            onCancel={(id: string) => {
              setOpen(false);
              if (id) {
                refetch();
              }
            }}
            parentPartyId={reviewData?.partyId}
            create
          />
        </Dialog>

        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <NavigationButtons
            setActiveStep={setCurrentStep}
            activeStep={activeStep}
            disabled={isPending}
          />
        </form>
      </Stack>
    </>
  );
};

EditReviewStep.title = 'Edit Review';
EditReviewStep.validationSchema = reviewSchema;

export { EditReviewStep };
