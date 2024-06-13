import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Button, Form, Text } from '@/components/ui';

import { useRootConfig } from '../EBComponentsProvider/RootConfigProvider';
import { useOnboardingForm } from './context/form.context';
import { useIPAddress } from './hooks/getIPAddress';
import { businessDetailsMock, controllerMock } from './mocks/reviewStep.mock';
import NavigationButtons from './Stepper/NavigationButtons';
import { useStepper } from './Stepper/Stepper';
import StepperHeader from './Stepper/StepperHeader';
import {
  BusinessDetailsStep,
  EntityTypeStep,
  OtherOwnersStep,
  PersonalDetailsStep,
  QuestionsStep,
  ReviewStep,
} from './Steps';
import { IndDetails, InitStep, OrgDetails } from './Steps_';
import { StepsSchema } from './Steps_/StepsSchema';
import { createYupSchema } from './Steps_/utils/createYupSchema';
import { VerificationsStep } from './Steps/VerificationStep/VerificationStep';
import { formToAPIBody } from './utils/apiUtilsParsers';
import { useContentData } from './utils/useContentData';

export const OnboardingWizardSchema = ({ title, schema, ...props }: any) => {
  const { onRegistration } = useRootConfig();
  const { mutateAsync: postClient } = useSmbdoPostClients();
  const { activeStep, setCurrentStep } = useStepper();
  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  const { data: ipAddress, status: ipFetchStatus } = useIPAddress();
  const { clientId } = useRootConfig();
  console.log('@@IPs', ipAddress, ipFetchStatus);
  const actualSchema = schema || StepsSchema({});

  useEffect(() => {
    if (props?.isMock) {
      setOnboardingForm({
        businessDetails: businessDetailsMock,
        controller: controllerMock,
        id: '1000010400',
        legalStructure: undefined,
        decisionMakers: undefined,
        outstandingItems: {
          attestationDocumentIds: Array(1),
          documentRequestIds: Array(0),
          partyIds: Array(0),
          partyRoles: Array(0),
          questionIds: Array(3),
        },
        owner: controllerMock,
      });
    }
  }, [props?.isMock]);

  useEffect(() => {
    if (ipAddress) {
      setOnboardingForm({ ...onboardingForm, ip: ipAddress });
    }
  }, [ipAddress]);

  useEffect(() => {
    if (clientId) {
      console.log('@@clientID', clientId);
    }
  }, [clientId]);

  const stepsWizard: any = {
    Init: InitStep,
    // Business: OrgDetails,
    Individual: IndDetails,
  };

  const steps = clientId
    ? [
        <ReviewStep
          key={1}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <VerificationsStep
          key={2}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
      ]
    : [
        <EntityTypeStep
          key={0}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <BusinessDetailsStep
          setActiveStep={setCurrentStep}
          key={1}
          activeStep={activeStep}
        />,
        <PersonalDetailsStep
          key={2}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <OtherOwnersStep
          key={3}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <QuestionsStep
          key={4}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <ReviewStep
          key={5}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
        <VerificationsStep
          key={6}
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
        />,
      ];

  const currentSchema: any = useMemo(
    () => actualSchema[activeStep],
    [activeStep]
  );
  const ActiveStep: any = useMemo(
    () => stepsWizard[currentSchema.stepName],
    [activeStep]
  );

  const { getContentToken } = useContentData(
    `schema.${ActiveStep?.contentData ?? ''}`
  );

  const validationSchema = createYupSchema({
    formSchema: currentSchema.form,
    getContentToken,
  });

  //   yupSchema[currentSchema.stepName](getContentToken) ?? yup.object({});

  type FormData = yup.InferType<typeof validationSchema>;
  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  console.log(
    '@@ActiveStep',
    form,
    activeStep,
    '::',
    ActiveStep.contentData,
    currentSchema.stepName,
    stepsWizard,
    '>>',
    getContentToken
  );

  const onSubmit = async () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      if (currentSchema.stepName === 'Individual') {
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
          const res = await postClient({
            data: {
              parties: [
                {
                  partyType: 'ORGANIZATION',
                  email: businessEmail,
                  roles: ['CLIENT'],
                  organizationDetails: {
                    organizationName,
                    organizationType: 'LIMITED_LIABILITY_COMPANY',
                    countryOfFormation,
                  },
                },
                {
                  partyType: 'INDIVIDUAL',
                  email: businessEmail,
                  roles: ['CONTROLLER'],
                  individualDetails: {
                    firstName,
                    lastName,
                    countryOfResidence,
                  },
                },
              ],
              products: ['EMBEDDED_PAYMENTS'],
            },
          });

          // TODO: do we need clone here?
          // const newOnboardingForm = _.cloneDeep(onboardingForm);
          // newOnboardingForm.id = res.id;
          // newOnboardingForm.outstandingItems = res.outstanding;

          if (onRegistration) {
            onRegistration({ clientId: res.id });
          }

          console.log('@@docs?', res);
          // setOnboardingForm({
          //   ...newOnboardingForm,
          //   attestations: res.outstanding.attestationDocumentIds || [],
          // });
          // setActiveStep(activeStep + 1);
        } catch (error) {
          console.log(error);
        }
       
      } else {
        setCurrentStep(activeStep + 1);
      }
      
    }
  };
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <Card className="eb-flex eb-flex-col eb-flex-wrap eb-overflow-clip">
              <CardHeader>
                <CardTitle>{title || 'Onboarding Wizards'}</CardTitle>
              </CardHeader>
              {(activeStep !== 0 || clientId) && (
                <StepperHeader
                  activeStep={activeStep}
                  setCurrentStep={setCurrentStep}
                  steps={steps.map((step) => step.type.title)}
                ></StepperHeader>
              )}

              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary, error }) => (
                  <>
                    <Text>
                      {/* TODO: should it be tokenized? */}
                      There was an error while trying to load this page.
                    </Text>
                    <Text className="eb-text-gray-600" size="lg">
                      {error.name}
                    </Text>
                    <Text className="eb-text-red-600">{error.message}</Text>
                    <Button onClick={() => resetErrorBoundary()}>
                      Try again
                    </Button>
                  </>
                )}
              >
                <CardContent>
                  <Box className="eb-flex eb-items-center  eb-space-x-4 eb-rounded-md eb-border eb-p-5">
                    <Form {...form}>
                      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
                        {form?.control && (
                          <ActiveStep {...{ schema: currentSchema, form }} />
                        )}
                        <NavigationButtons
                          setActiveStep={setCurrentStep}
                          activeStep={activeStep}
                        />
                      </form>
                    </Form>
                  </Box>
                </CardContent>
              </ErrorBoundary>
            </Card>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
};
