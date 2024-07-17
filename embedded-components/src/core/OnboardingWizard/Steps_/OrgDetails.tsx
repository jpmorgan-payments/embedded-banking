import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSmbdoPostClients } from '@/api/generated/embedded-banking';
import { Box, Separator, Stack, Text, Title } from '@/components/ui';

import { useFormSchema } from '../context/formProvider.contex';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useStepper } from '../Stepper/useStepper';
import { useContentData } from '../utils/useContentData';
import { businessSchema } from './StepsSchema';
import { RenderForms } from './utils/RenderForms';

const OrgDetails = ({ formSchema, yupSchema }: any) => {
  const form = useFormContext();
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');

  const { mutateAsync: postClient, isPending: isPendingClientPost } =
    useSmbdoPostClients();

  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  useEffect(() => {
    updateSchema(yupSchema);
  }, [yupSchema]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;
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
              className: `eb-space-y-4 eb-grid eb-grid-cols-3 eb-gap-4`,
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

OrgDetails.title = 'Organization';
OrgDetails.contentData = 'BusinessDetailsStep';
OrgDetails.formSchema = businessSchema;

export { OrgDetails };
