import { FC, ReactNode, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Stack } from '@/components/ui/stack';
import { Title } from '@/components/ui/title';

import { useOnboardingForm } from '../../context/form.context';
import { EntityTypeForm } from '../../Forms/EntityTypeForm/EntityTypeForm';
import NavigationButtons from '../../Stepper/NavigationButtons';
import {
  addBusinessDetails,
  addBusinessType,
  addQuestionAnswers,
} from '../../utils/actions';
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
  const [selectedAccountType, setSelectedAccountType] = useState(''); // Default to individual
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
      /*
      ...(isSolo
            ? {}
            : {
                relatedToATM: form.getValues('relatedToATM'),
                businessInSanctionedCountries: form.getValues(
                  'businessInSanctionedCountries'
                ),
              }),
      */
      let newOnboardingForm = addBusinessType(
        onboardingForm,
        form.getValues('legalStructure')
      );

      //TODO: Fix the types and improve the addition for business Type

      //@ts-ignore

      newOnboardingForm = addQuestionAnswers(newOnboardingForm, {
        significantOwnership: form.getValues('significantOwnership'),
        //@ts-ignore
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
      <Title as="h3">What Kind of Business do you run?</Title>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            setSelectedAccountType(form.getValues().legalStructure);
          }}
        >
          <EntityTypeForm form={form} />
          <NavigationButtons
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        </form>
      </Form>
    </Stack>
  );
};

export { EntityTypeStep };
