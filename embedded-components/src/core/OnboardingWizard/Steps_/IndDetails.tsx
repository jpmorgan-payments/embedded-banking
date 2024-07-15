import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Box, Separator, Stack, Text, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';

import { useOnboardingForm } from '../context/form.context';
import { useFormSchema } from '../context/formProvider.contex';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useStepper } from '../Stepper/useStepper';
import { useContentData } from '../utils/useContentData';
import { individaulSchema } from './StepsSchema';
import { RenderForms } from './utils/RenderForms';

const IndDetails = ({ formSchema, yupSchema }: any) => {
  const { onRegistration } = useRootConfig();
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  const { onboardingForm, setOnboardingForm } = useOnboardingForm();

  const [blank, setUpdate] = useState(0);
  const { getContentToken } = useContentData('steps.ControllerDetailsStep');

  const { mutateAsync: postClient, isPending: isPendingClientPost } =
    useSmbdoPostClients();

  const countryFormFields = formSchema?.form?.filter(
    (field: any) => field.name === 'countryOfResidence'
  )[0];

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  useEffect(() => {
    if (!countryFormFields?.optionsList) {
      countryFormFields.optionsList = [
        { value: 'US', label: 'US' },
        { value: 'Canada', label: 'Canada' },
        { value: 'UK', label: 'UK' },
      ];
      setUpdate(blank + 1);
    }
  }, [countryFormFields]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;
    console.log('@@ON SUBMIT', postClient);

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
        console.log('@@docs?', res);
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

  console.log('@@schema', formSchema.form);

  return (
    <Stack className="eb-w-full">
      <Title as="h2" className="eb-mb-4">
        Tell us about your Organization
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
IndDetails.title = 'Individual';
IndDetails.contentData = 'controllerDetailsSchema';
IndDetails.formSchema = individaulSchema;

export { IndDetails };
