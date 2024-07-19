import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Box, Separator, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useOnboardingForm } from '@/core/OnboardingWizard/context/form.context';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.contex';
import NavigationButtons from '@/core/OnboardingWizard/Stepper/NavigationButtons';
import { useStepper } from '@/core/OnboardingWizard/Stepper/useStepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { individualSchema } from '../StepsSchema';
// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';

const IndividualDetailsStep = ({ formSchema, yupSchema }: any) => {
  const { onRegistration } = useRootConfig();
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  // const { getContentToken: ownerConter } = useContentData(
  //   'schema.businessOwnerFormSchema'
  // );

  const { getContentToken } = useContentData('steps.ControllerDetailsStep');
  const { mutateAsync: postClient, isPending: isPendingClientPost } =
    useSmbdoPostClients();

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;

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
        organizationType,
        individualEmail,
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
                  // TODO: update organization Type
                  organizationType,
                  countryOfFormation,
                },
              },
              {
                partyType: 'INDIVIDUAL',
                email: individualEmail || businessEmail,
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

        setCurrentStep(activeStep + 1);
        setOnboardingForm({
          ...onboardingForm,
          id: res.id,
          outstandingItems: res?.outstanding || [],
        });
        // setOnboardingForm({
        //   ...newOnboardingForm,
        //   attestations: res.outstanding.attestationDocumentIds || [],
        // });
        // setActiveStep(activeStep + 1);
      } catch (error) {
        console.log(error);
      }
    }
  }, [activeStep]);

  return (
    <Stack className="eb-w-full">
      <Title as="h2" className="eb-mb-4">
        Tell us about yourself
      </Title>
      <Separator className="eb-mb-4" />

      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="eb-w-full"
      >
        <Box className="eb-w-full">
          <RenderForms
            {...{
              formSchema: formSchema.form,
              getContentToken,
              form,
              className: `eb-space-y-4 eb-grid eb-grid-cols-3 eb-gap-4 first:eb-mt-8`,
            }}
          />
        </Box>
        <NavigationButtons
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
          disabled={isPendingClientPost}
        />
      </form>
    </Stack>
  );
};
IndividualDetailsStep.title = 'Individual';
IndividualDetailsStep.contentData = 'controllerDetailsSchema';
IndividualDetailsStep.formSchema = individualSchema;

export { IndividualDetailsStep };
