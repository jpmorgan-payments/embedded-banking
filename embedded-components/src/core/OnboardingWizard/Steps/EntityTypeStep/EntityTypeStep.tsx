import { FC, ReactNode, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Form, Stack, Title } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import { EntityTypeForm } from '../../Forms/EntityTypeForm/EntityTypeForm';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { addBusinessType, addQuestionAnswers } from '../../utils/actions';
import { useContentData } from '../../utils/useContentData';
import {
  createEntityTypeFormValidationSchema,
  tEntityTypeFormValidationSchemaValues,
} from './EntityTypeStep.schema';

type EntityTypeStepProps = {
  children?: ReactNode;
  setActiveStep: any;
  activeStep: number;
};

const EntityTypeStep: FC<EntityTypeStepProps> = ({
  setActiveStep,
  activeStep,
}: any) => {
  const [, setSelectedAccountType] = useState(''); // Default to individual
  const { getContentToken } = useContentData('features.EntityTypeForm');

  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const defaultInitialValues = createEntityTypeFormValidationSchema().cast(
    {}
  ) as tEntityTypeFormValidationSchemaValues;

  const form = useForm<any>({
    defaultValues: {
      ...defaultInitialValues,
      legalStructure: onboardingForm?.legalStructure ?? '',
      ...(onboardingForm?.businessDetails?.entitiesInOwnership
        ? onboardingForm?.businessDetails
        : {
            entitiesInOwnership: 'no',
            significantOwnership: 'no',
          }),
    },
    resolver: yupResolver(
      createEntityTypeFormValidationSchema(getContentToken)
    ),
    mode: 'onBlur',
  });

  const onSubmit: any = () => {
    const errors = form?.formState?.errors;

    const isSolo = form.getValues('legalStructure').includes('Sole');

    
    if (!Object.values(errors).length) {
      let newOnboardingForm = addBusinessType(
        onboardingForm,
        form.getValues('legalStructure')
      );

      newOnboardingForm = addQuestionAnswers(newOnboardingForm, {
        significantOwnership: form.getValues('significantOwnership'),
        entitiesInOwnership: form.getValues('entitiesInOwnership'),
        ...(isSolo
          ? {}
          : {
              relatedToATM: form.getValues('relatedToATM'),
              businessInSanctionedCountries: form.getValues(
                'businessInSanctionedCountries'
              ),
            }),
      });

      setOnboardingForm(newOnboardingForm);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Stack>
      <Title as="h3">{getContentToken(`title`)}</Title>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            // State change trigger
            setSelectedAccountType(form.getValues().legalStructure);
          }}
        >
          <EntityTypeForm form={form} />
          <NavigationButtons
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            disableNext={
              form.getValues().businessInSanctionedCountries === 'yes' ||
              form.getValues().relatedToATM === 'yes'
            }
          />
        </form>
      </Form>
    </Stack>
  );
};

export { EntityTypeStep };
