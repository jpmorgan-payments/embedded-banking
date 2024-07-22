import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

// import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Box, Separator, Stack, Title } from '@/components/ui';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.contex';
import NavigationButtons from '@/core/OnboardingWizard/Stepper/NavigationButtons';
import { useStepper } from '@/core/OnboardingWizard/Stepper/useStepper';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';

import { businessSchema } from '../StepsSchema';

// eslint-disable-next-line
import { RenderForms } from '../utils/RenderForms';

const OrganizationDetailsStep = ({ formSchema, yupSchema }: any) => {
  const form = useFormContext();
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');

  // const { mutateAsync: postClient, isPending: isPendingClientPost } =
  //   useSmbdoPostClients();

  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  const onSubmit = useCallback(async () => {
    // const errors = form?.formState?.errors;
    setCurrentStep(activeStep + 1);
  }, [activeStep]);

  return (
    <Stack className="eb-w-full ">
      <Title as="h2" className="eb-mb-4">
        Tell us about your organization
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
              className: `eb-space-y-2 eb-grid eb-grid-cols-3 eb-gap-4`,
            }}
          />
        </Box>
        <NavigationButtons
          setActiveStep={setCurrentStep}
          activeStep={activeStep}
          // disabled={isPendingClientPost}
        />
      </form>
    </Stack>
  );
};

OrganizationDetailsStep.title = 'Organization';
OrganizationDetailsStep.contentData = 'BusinessDetailsStep';
OrganizationDetailsStep.formSchema = businessSchema;

export { OrganizationDetailsStep };
