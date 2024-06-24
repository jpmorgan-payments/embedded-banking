import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box } from '@/components/ui';

import { useFormSchema } from '../context/formProvider.contex';
import { useStepper } from '../Stepper/useStepper';
import { useContentData } from '../utils/useContentData';
import { initSchema } from './StepsSchema';
import { RenderForms } from './utils/RenderForms';

const InitStep = ({ formSchema, yupSchema, children }: any) => {
  const form = useFormContext();
  const { updateSchema } = useFormSchema();
  const { activeStep, setCurrentStep } = useStepper();

  const [blank, setUpdate] = useState(0);
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');

  const orgTypesFormFields = formSchema?.form?.filter(
    (field: any) => field.name === 'organizationType'
  )[0];
  const countryFormFields = formSchema?.form?.filter(
    (field: any) => field.name === 'countryOfFormation'
  )[0];

  console.log('@@STEP1', formSchema, form, yupSchema);

  useEffect(() => {
    console.log('@@SCHEMA', yupSchema, initSchema);
    if (yupSchema) {
      updateSchema(yupSchema);
    } else {
      updateSchema(initSchema);
    }
  }, [yupSchema]);

  useEffect(() => {
    if (!orgTypesFormFields?.optionsList) {
      orgTypesFormFields.optionsList = [
        'Corporation',
        'Limited Partnership',
        'Limited Liability Company',
        'Sole Proprietorship',
      ];
      setUpdate(blank + 1);
    }

    if (!countryFormFields?.optionsList) {
      countryFormFields.optionsList = ['US', 'Canada', 'UK'];
      setUpdate(blank + 1);
    }
  }, [orgTypesFormFields, countryFormFields]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;
    console.log('@@ON SUBMIT', errors);

    setCurrentStep(activeStep + 1);
  }, [activeStep]);

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <Box className="eb-grid eb-grid-cols-2 eb-gap-4">
        <RenderForms
          {...{ formSchema: formSchema.form, getContentToken, form }}
        />
      </Box>
      {children}
    </form>
  );
};

InitStep.title = 'Init';
InitStep.contentData = 'BusinessDetailsStep';
InitStep.formSchema = initSchema;

export { InitStep };
