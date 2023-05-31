import { useEffect, useMemo, useRef, useState } from 'react';
import * as yup from 'yup';
import {
  Stepper,
  Group,
  Button,
  Title,
  useMantineTheme,
  LoadingOverlay,
  Text,
  RingProgress,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';

import { Panel } from 'components';

import {
  EntityTypeForm,
  EntityTypeFormValues,
} from './EntityTypeForm/EntityTypeForm';

import { StepsLLC, StepsSP } from './Steps';
import type { EntityType, OnboardingValues } from './models';

import { mockFormValuesLLC, mockFormValuesSP } from './mocks';
import { convertFormValuesToClientRequest } from './utils/convertFormValuesToClientRequest';
import { useCreateClient } from './hooks';

export const OnboardingWizard = () => {
  const theme = useMantineTheme();
  const modals = useModals();

  const [started, setStarted] = useState(false);
  const [entityType, setEntityType] = useState<EntityType>('');
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const openCancelModal = () =>
    modals.openConfirmModal({
      title: 'Cancel onboarding?',
      centered: true,
      children: (
        <Text>
          Are you sure you want to cancel onboarding and return to the
          beginning? You will lose all of your progress.
        </Text>
      ),
      labels: { confirm: 'Cancel onboarding', cancel: "No, don't cancel it" },
      onConfirm: () => {
        setEntityType('');
        setStarted(false);
      },
    });

  // Update steps array based on selected entity type
  const steps = useMemo(() => {
    if (entityType === 'LLC') {
      return StepsLLC;
    } else if (entityType === 'Sole Proprietor') {
      return StepsSP;
    } else {
      return [];
    }
  }, [entityType]);

  const ActiveStep = useMemo(() => steps[activeStep], [steps, activeStep]);

  const handlePrev = () => {
    if (activeStep === 0) {
      openCancelModal();
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const handleNext = () =>
    setActiveStep(Math.min(activeStep + 1, steps.length - 1));

  // Scroll to top of wizard when user moves through it
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panelRef.current?.scrollIntoView();
  }, [started, activeStep]);

  const isLastStep = activeStep === steps.length - 1;

  const initialValues = useMemo(
    () =>
      steps.reduce<OnboardingValues>(
        (combinedInitialValues, { initialValues, validationSchema }) => {
          const stepInitialValues = initialValues ?? validationSchema?.cast({});
          return {
            ...combinedInitialValues,
            ...stepInitialValues,
          };
        },
        {} as OnboardingValues,
      ),
    [steps],
  );

  const form = useForm<OnboardingValues>({
    validate: yupResolver(ActiveStep?.validationSchema ?? yup.object({})),
  });

  const handleEntityTypeSubmit = ({ mockEnabled }: EntityTypeFormValues) => {
    form.reset();
    form.setValues(initialValues);
    setStarted(true);
    if (mockEnabled) {
      if (entityType === 'LLC') {
        form.setValues(mockFormValuesLLC);
      } else if (entityType === 'Sole Proprietor') {
        form.setValues(mockFormValuesSP);
      }
    }
  };

  const { mutate: createClient } = useCreateClient();

  const handleSubmit = (values: OnboardingValues) => {
    if (!isLastStep) {
      handleNext();
      return;
    }

    setSubmitting(true);

    const clientRequest = convertFormValuesToClientRequest(values, entityType);
    console.log(clientRequest);

    createClient(clientRequest, {
      onSuccess: (data, variables) => {
        console.log(data);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  const lessThanMd = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Panel
      ref={panelRef}
      sx={{
        scrollMarginTop: 86,
      }}
    >
      <LoadingOverlay visible={submitting} />
      <Title mb="xl">
        Onboard Your Business {started ? `- ${entityType}` : ''}
      </Title>
      {!started ? (
        <EntityTypeForm
          onSelect={setEntityType}
          onSubmit={handleEntityTypeSubmit}
        />
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {lessThanMd ? (
            <Group>
              <RingProgress
                roundCaps
                size={140}
                label={
                  <Text align="center" weight={700} size="xl">
                    {activeStep + 1} of {steps.length}
                  </Text>
                }
                sections={[
                  {
                    value: ((activeStep + 1) / steps.length) * 100,
                    color: 'blue',
                  },
                ]}
              />
              <div>
                <Text
                  weight={700}
                  sx={{
                    fontSize: 28,
                  }}
                >
                  {ActiveStep.label}
                </Text>
                <Text color="dimmed" size="xl">
                  {isLastStep
                    ? 'This is the last step!'
                    : `Next: ${steps[activeStep + 1].label}`}
                </Text>
              </div>
            </Group>
          ) : null}
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            breakpoint="md"
            styles={{
              steps: {
                [theme.fn.smallerThan('md')]: {
                  display: 'none',
                },
              },
            }}
          >
            {steps.map((Step, index) => (
              <Stepper.Step
                key={index}
                label={Step.label}
                icon={Step.Icon ? <Step.Icon size={18} /> : null}
                description={Step.description}
                allowStepSelect={activeStep > index && !submitting}
              >
                <Step form={form} entityType={entityType} />
              </Stepper.Step>
            ))}
          </Stepper>

          <Group position="apart" mt="xl">
            <Button
              variant="default"
              onClick={handlePrev}
              disabled={submitting}
            >
              {activeStep !== 0 ? 'Back' : 'Cancel'}
            </Button>
            <Button loading={submitting} type="submit">
              {isLastStep ? 'Submit' : ActiveStep.nextLabel ?? 'Next'}
            </Button>
          </Group>
        </form>
      )}
    </Panel>
  );
};
